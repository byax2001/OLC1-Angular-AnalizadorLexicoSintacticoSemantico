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
        //DEBEN DE EXISTIR DOS NUEVOS ENVIROMENTS
            //1: PARA DECLARAR LAS VARIABLES DE LOS PARAMETROS INGRESADOS EN LA FUNCION O METODOS
            //2: PARA LAS INSTRUCCIONES ADENTRO DE ESA FUNCION O METODO

        //for declaracion-ids elemenentos
        //MeFun: Metodos y funcion
        let resultR:Retorno={value:null,type:Type.error}
        let MeFun=env.getFunMetodo(this.idMF,this.paramsCall.length);
        if(MeFun.type!=Type.error){//SI SE ENCONTRO LA FUNCION O METODO SE PROCEDE A REALIZAR
            let newEnv= new Environment(env); //Nuevo Enviroment
            if(MeFun.type===Type.VOID){
                //METODOS
                let parametrosMf=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                for(let i=0;i<this.paramsCall.length;i++){
                    parametrosMf[i].changeExpresion(this.paramsCall[i]); //ENVIROMENT ANTERIOR
                    parametrosMf[i].execute(newEnv); //ENVIROMENT ANTERIOR 
                }
                //ENVIROMENT BLOQUE 
                let newEnv2= new Environment(newEnv); //Nuevo Enviroment
                for(let Instruccion of instrucciones){
                    if(Instruccion instanceof Return){ //SI TIENE UNA INSTRUCCION RETURN 
                        let result= Instruccion.execute(newEnv2);
                        if(result.expR.value!==undefined){
                            //ERROR ESTA INTENTANDO RETORNAR UN VALOR 
                            B_datos.getInstance().addError("Semantico","Intento de retornar un valor en un metodo",this.line,this.column); 
                            B_datos.getInstance().addEnviroments("Metodo",newEnv2);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                            return resultR 
                        }
                        return resultR ;
                    }
                    Instruccion.execute(newEnv2);
                }
                B_datos.getInstance().addEnviroments("Metodo",newEnv2);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            }else{
                //FUNCIONES ===================================================================
               
                let parametrosMf=MeFun.value[0];
                let instrucciones= MeFun.value[1];
                //PARAMETROS DE LLAMADA
                for(let i=0;i<this.paramsCall.length;i++){
                    parametrosMf[i].changeExpresion(this.paramsCall[i]); //ENVIROMENT ANTERIOR
                    parametrosMf[i].execute(newEnv); //NUEVO ENVIROMENT
                }
                //NUEVO ENVIROMENT 2 PARA LAS INTRUCCIONES ADENTRO DE LA FUNCION
                let newEnv2= new Environment(newEnv); //Nuevo Enviroment
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
                            let result= Instruccion.execute(newEnv2);
                            if(result.expR.value===undefined){
                                //ERROR NO ESTA RETORNANDO UN VALOR 
                                B_datos.getInstance().addError("Semantico","No se esta retornando nada en la funcion",this.line,this.column); 
                                return null 
                            }else{
                                if(result.expR.type===MeFun.type){
                                    resultR={value:result.expR.value,type:result.expR.type}
                                    B_datos.getInstance().addEnviroments("Funcion",newEnv2);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                                    return resultR
                                }else{
                                    //VALOR DE RETORNO NO IGUAL AL DECLARADO EN LA FUNCION
                                    B_datos.getInstance().addError("Semantico","Valor de retorno no igual al declarado en la funcion",this.line,this.column); 
                                    B_datos.getInstance().addEnviroments("Funcion",newEnv2);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                                    return resultR
                                }
                            }
                        }
                        Instruccion.execute(newEnv2);
                    }
                    B_datos.getInstance().addEnviroments("Funcion",newEnv2);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                }else{
                    //REPORTAR ERROR NO SE ESTA RETORNANDO NADA 
                    B_datos.getInstance().addError("Semantico","No se esta retornando nada en la funcion",this.line,this.column); 
                    B_datos.getInstance().addEnviroments("Funcion",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                }
                
            }
        }else{
            //REPORTAR ERROR se esta llamando a una funcion o metodo que no existe 
            B_datos.getInstance().addError("Semantico","La funcion o metodo llamados no existen",this.line,this.column);  
            return null 
        }
        
    }
    public ast(idPadre: string, NoHijo: number, NivelPadre: number) {
        let nivel = NivelPadre + 1; //NIVEL NODO ACTUAL
        let nivelHijo = nivel + 1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nCall "
        }
        B_datos.getInstance().addNodosAst(nodo);
        //NODOS y EDGYS: ID    Se puede agregar de si es metodo a funcion en el label

        let nodoId = {
            id: `${id}${0}N${nivelHijo}`, //Padre+1
            label: this.idMF
        }
        B_datos.getInstance().addNodosAst(nodoId);
        let edge = {
            from: id,
            to: `${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addEdgesAst(edge);
        //PARAMETROS 
        if (this.paramsCall.length!==0) {
            nodoId = {
                id: `${id}${1}N${nivelHijo}`, //Padre+1
                label: " Parametros "
            }
            B_datos.getInstance().addNodosAst(nodoId);
            edge = {
                from: id,
                to: `${id}${1}N${nivelHijo}`,
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
    }

}