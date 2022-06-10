import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { TypeAritmeticas } from "./TypeAritmeticas";

export class IncDecremento extends expresion{
    constructor(
        private id:string,
        private typeArit: TypeAritmeticas,
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error}
        if(this.typeArit==TypeAritmeticas.INCDER){
            let existe=env.existeSimbolo(this.id);
            if(existe==true){
                let simbolo=env.getSimbolo(this.id);
                if(simbolo.type==Type.INT){
                    result={value:simbolo.value,type:simbolo.type}
                    env.ChangeSimbolo(this.id,simbolo.value+1);
                }else if (simbolo.type==Type.DOUBLE){
                    result={value:simbolo.value,type:simbolo.type}
                    env.ChangeSimbolo(this.id,simbolo.value+1);
                }else{
                    //ERRORES TIPOS DE VALORES NO COHERENTES PARA AUMENTAR VALOR
                    B_datos.getInstance().addError("Semantico","Tipos de valores no coherentes para aumentar",this.line,this.column);    
                }
            }else{
                //ERROR NO EXISTE EL ID A SUMAR
                B_datos.getInstance().addError("Semantico","No se ha declarado el id con anterioridad",this.line,this.column);    
            }
        }else if(this.typeArit==TypeAritmeticas.INCIZQ){
            let existe=env.existeSimbolo(this.id);
            if(existe==true){
                let simbolo=env.getSimbolo(this.id);
                if(simbolo.type==Type.INT){
                    env.ChangeSimbolo(this.id,simbolo.value+1);
                    result={value:simbolo.value,type:simbolo.type}
                }else if (simbolo.type==Type.DOUBLE){
                    env.ChangeSimbolo(this.id,simbolo.value+1);
                    result={value:simbolo.value,type:simbolo.type}
                }else{
                    //ERRORES TIPOS DE VALORES NO COHERENTES PARA AUMENTAR VALOR
                    B_datos.getInstance().addError("Semantico","Tipos de valores no coherentes para aumentar",this.line,this.column); 
                }
            }else{
                //ERROR NO EXISTE EL ID A SUMAR
                B_datos.getInstance().addError("Semantico","No se ha declarado el id con anterioridad",this.line,this.column);    
            }
        }else if(this.typeArit==TypeAritmeticas.DECDER){
            let existe=env.existeSimbolo(this.id);
            if(existe==true){
                let simbolo=env.getSimbolo(this.id);
                if(simbolo.type==Type.INT){
                    result={value:simbolo.value,type:simbolo.type}
                    env.ChangeSimbolo(this.id,(simbolo.value-1));
                }else if (simbolo.type==Type.DOUBLE){
                    result={value:simbolo.value,type:simbolo.type}
                    env.ChangeSimbolo(this.id,(simbolo.value-1));
                }else{
                    //ERRORES TIPOS DE VALORES NO COHERENTES PARA AUMENTAR VALOR
                    B_datos.getInstance().addError("Semantico","Tipos de valores no coherentes para decrementar",this.line,this.column); 
                }
            }else{
                //ERROR NO EXISTE EL ID A SUMAR
                B_datos.getInstance().addError("Semantico","No se ha declarado el id con anterioridad",this.line,this.column);    
            }
        }else if(this.typeArit==TypeAritmeticas.DECIZQ){
            let existe=env.existeSimbolo(this.id);
            if(existe==true){
                let simbolo=env.getSimbolo(this.id);
                if(simbolo.type==Type.INT){
                    env.ChangeSimbolo(this.id,simbolo.value-1);
                    result={value:simbolo.value,type:simbolo.type}
                }else if (simbolo.type==Type.DOUBLE){
                    env.ChangeSimbolo(this.id,(simbolo.value-1));
                    result={value:simbolo.value,type:simbolo.type}
                }else{
                    //ERRORES TIPOS DE VALORES NO COHERENTES PARA AUMENTAR VALOR
                    B_datos.getInstance().addError("Semantico","Tipos de valores no coherentes para decrementar",this.line,this.column); 
                }
            }else{
                //ERROR NO EXISTE EL ID A SUMAR
                B_datos.getInstance().addError("Semantico","No se ha declarado el id con anterioridad",this.line,this.column);    
            }
        }
        return result
    }
}