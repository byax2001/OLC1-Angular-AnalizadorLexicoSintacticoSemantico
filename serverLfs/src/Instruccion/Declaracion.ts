
import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    constructor(
        public constante:boolean,
        public tipo:Type,
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
            if(existe==true){
                //ERROR YA FUE DECLARADA ESTA VARIABLE CON ANTERIORIDAD
                B_datos.getInstance().addError("Semantico","Intento de declarar 2 veces una variable",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                //ERROR  2
                if(this.tipo!=exp.type){
                    B_datos.getInstance().addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                    console.log("error semantico distintos tipos");
                }
            
                console.log("error semantico ya existia la variable")   
            }else{    
                if(this.tipo==exp.type){
                    //GUARDAR DATO
                    env.guardarSimbolo(this.constante,this.tipo,id,exp.value,this.line,this.column);
                    console.log('--------------------acabo de guardar una variable------------------')
                
                }else{
                    //ERROR  NO COINCIDEN LOS TIPOD DE DATOS DE LA VARIABLE Y SU EXPRESION
                    B_datos.getInstance().addError("Semantico","Tipo de declaracion y dato no coinciden",this.line,this.column);
                    console.log("error semantico distintos tipos");
                }
            }

        })
        
    }
}