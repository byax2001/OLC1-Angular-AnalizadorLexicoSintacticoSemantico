import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Asignacion extends instruction{
    constructor(
        public id:string[],
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)
    }
    public execute(env:Environment){  
        let exp=this.expresion.execute(env);
        this.id.forEach((id)=>{
            let existe=env.existeSimbolo(id);
            if(existe==false){
                //ERROR VARIABLE NO EXISTE
                B_datos.getInstance().addError("Semantico","Variable no declarada",this.line,this.column); 
                console.log("variable no declarada") 
            }else{
                let simbolo=env.getSimbolo(id);
                if(simbolo.constante==true){
                    //ERROR LA VARIABLE ES CONSTANTE
                    B_datos.getInstance().addError("Semantico","No se puede cambiar el valor, var Constante",this.line,this.column);  
                    if(simbolo.type!=exp.type){
                        //NO COINCIDIERON LOS TIPOS DE DATOS 
                        B_datos.getInstance().addError("Semantico","No coinciden los tipos de de datos",this.line,this.column)
                    }
                }else{
                    if(simbolo.type==exp.type){
                        //COINCIDIERON LOS TIPOS DE DATOS
                        env.ChangeSimbolo(id,exp.value)
                    }else{
                        //NO COINCIDIERON LOS TIPOS DE DATOS 
                        B_datos.getInstance().addError("Semantico","No coinciden los tipos de de datos",this.line,this.column)
                    }
                } 
            }

        })
        console.log("ASIGNACION=================================")
        console.log(env)
        
    }
}