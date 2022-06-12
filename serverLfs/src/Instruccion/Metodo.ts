import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Metodo extends instruction{
    constructor(
        public id: string,
        public parametros: instruction[],
        public instrucciones:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        let existeM=env.existeSimbolo(this.id);
        if(existeM==false){
            //INGRESAR NUEVO METODO
            env.guardarSimboloMF(true,Type.VOID,this.id,[this.parametros,this.instrucciones],this.line,this.column,this.parametros.length);
        }else{
            let metodo=env.getSimbolo(this.id);
            if(metodo.type==Type.VOID){ //SI ES TIPO VOID ENTONCES SI ES UN METODO
                if(metodo.nParametros!=this.parametros.length){ //nparamteros distintos, distintos metodos
                    //INGREAR NUEVO METODO 
                    env.guardarSimboloMF(true,Type.VOID,this.id,[this.parametros,this.instrucciones],this.line,this.column,this.parametros.length);
                }else{
                    //REPORTAR ERROR 
                    B_datos.getInstance().addError("Semantico","Intento de guardar un metodo ya existente",this.line,this.column);
                }
            }
        }
        
    }
}