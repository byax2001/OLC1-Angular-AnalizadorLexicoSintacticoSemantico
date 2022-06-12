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
        public paramsCall:any[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        //for declaracion-ids elemenentos

        //MeFun: Metodos y funcion
        let resultR:Retorno={value:null,type:Type.error}
        let MeFun=env.getFunMetodo(this.idMF,this.paramsCall.length);
        if(MeFun.type!=Type.error){//SI SE ENCONTRO LA FUNCION O METODO SE PROCEDE A REALIZAR
            if(MeFun.type===Type.VOID){
               
                //METODOS
                let parametrosMf=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                for(let i=0;i<this.paramsCall.length;i++){
                    parametrosMf[i].changeExpresion(this.paramsCall[i]); //ENVIROMENT ANTERIOR
                    parametrosMf[i].execute(env); //NUEVO ENVIROMENT
                }
                for(let Instruccion of instrucciones){
                    if(Instruccion instanceof Return){
                 
                        let result= Instruccion.execute(env);
                        if(result.expR.value!==undefined){
                            //ERROR ESTA INTENTANDO RETORNAR UN VALOR 
                            B_datos.getInstance().addError("Semantico","Intento de retornar un valor en un metodo",this.line,this.column); 
                            return resultR 
                        }
                        return resultR ;
                    }
                    Instruccion.execute(env);
                }
            }else{
                //FUNCIONES
                let parametrosMf=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                //PARAMETROS DE LLAMADA
                for(let i=0;i<this.paramsCall.length;i++){
                    console.log(this.paramsCall);
                    console.log(parametrosMf);
                    parametrosMf[i].changeExpresion(this.paramsCall[i]); //ENVIROMENT ANTERIOR
                    console.log(parametrosMf);
                    parametrosMf[i].execute(env); //NUEVO ENVIROMENT
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
                            if(result.expR.value===undefined){
                                //ERROR NO ESTA RETORNANDO UN VALOR 
                                B_datos.getInstance().addError("Semantico","No se esta retornando nada en la funcion",this.line,this.column); 
                                return null 
                            }else{
                                if(result.expR.type===MeFun.type){
                                    resultR={value:result.expR.value,type:result.expR.type}
                                    return resultR
                                }else{
                                    //VALOR DE RETORNO NO IGUAL AL DECLARADO EN LA FUNCION
                                    B_datos.getInstance().addError("Semantico","Valor de retorno no igual al declarado en la funcion",this.line,this.column); 
                                    return resultR
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