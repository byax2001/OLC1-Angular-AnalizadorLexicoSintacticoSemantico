import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Symbol } from "../Symbols/Symbol";
import { Type } from "../Symbols/Type";
import { Return } from "./Return";

export class Call extends instruction{
    constructor(
        public idMF: string,
        public parametros:string[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        //MeFun: Metodos y funcion
        let resultR:Retorno={value:null,type:Type.error}
        let MeFun=env.getFunMetodo(this.idMF,this.parametros.length);
        if(MeFun.type!=Type.error){//SI SE ENCONTRO LA FUNCION O METODO SE PROCEDE A REALIZAR
            if(MeFun.type==Type.VOID){
                //METODOS
                let parametros=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                for(let parametro of parametros){
                    parametro.execute(env); //VERIFICAR DE NO INSTANCIAR UNA VARIABLE YA REPETIDA 
                }
                for(let Instruccion of instrucciones){
                    if(Instruccion instanceof Return){
                        let result= Instruccion.execute(env);
                        if(result.expR.value!=null){
                            //ERROR ESTA INTENTANDO RETORNAR UN VALOR 
                            B_datos.getInstance().addError("Semantico","Intento de retornar un valor en un metodo",this.line,this.column); 
                            return null 
                        }
                        break;
                    }
                    Instruccion.execute(env);
                }
            }else{
                //FUNCIONES
                let parametros=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                //PARAMETROS
                for(let parametro of parametros){
                    parametro.execute(env); //VERIFICAR DE NO INSTANCIAR UNA VARIABLE YA REPETIDA 
                }
                //INSTRUCCIONES 
                let existeR=false;
                for(let Instruccion of instrucciones){
                    if(Instruccion instanceof Return){ //PARA SABER SI HAY MAS DE ALGUNA INSTRUCCION RETURN 
                        existeR=true;
                    }
                }
                if(existeR){
                    for(let Instruccion of instrucciones){
                        if(Instruccion instanceof Return){
                            let result= Instruccion.execute(env);
                            if(result.expR.value==null){
                                //ERROR ESTA INTENTANDO RETORNAR UN VALOR 
                                B_datos.getInstance().addError("Semantico","No se esta retornando nada en la funcion",this.line,this.column); 
                                return null 
                            }else{
                                if(result.expR.type==MeFun.type){
                                    resultR={value:result.expR.value,type:result.expR.type}
                                    return resultR
                                }else{
                                    //VALOR DE RETORNO NO IGUAL AL DECLARADO EN LA FUNCION
                                    B_datos.getInstance().addError("Semantico","Valor de retorno no igual al declarado en la funcion",this.line,this.column); 
                                }
                            }
                            break;
                        }
                        Instruccion.execute(env);
                    }
                }else{
                    //REPORTAR ERROR NO SE ESTA RETORNANDO NADA 
                    B_datos.getInstance().addError("Semantico","No se esta retornando nada en la funcion",this.line,this.column); 
                }
                
            }
        }else{
            //REPORTAR ERROR se esta llamando a una funcion o metodo que no existe 
            B_datos.getInstance().addError("Semantico","La funcion o metodo llamados no existen",this.line,this.column);  
            return null 
        }
        
    }

}