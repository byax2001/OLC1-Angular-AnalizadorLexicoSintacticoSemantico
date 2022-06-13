import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class If extends instruction{

    constructor(
        public expresion:expresion,
        public instruction:instruction[],
        public instruction2:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }


    public execute(env: Environment) {
        let result = this.expresion.execute(env);
        if (result.type !== Type.error) {
            let newEnviromet= new Environment(env);
            if (result.value === true) {
                for (let i = 0; i < this.instruction.length; i++) {
                    if(this.instruction[i] instanceof Return || this.instruction[i] instanceof Break || this.instruction[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        return null; 

                    }
                    const res = this.instruction[i].execute(newEnviromet);
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            } else {
                for (let i = 0; i < this.instruction2.length; i++) {
                    if(this.instruction2[i] instanceof Return || this.instruction2[i] instanceof Break || this.instruction2[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break, Return o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        return null; 
                    }
                    const res = this.instruction2[i].execute(newEnviromet);
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            }
        } else {
            //EXPRESION GENERA ERROR EN EL IF 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el if",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
            return null
        }
        return null;
    }
    public ast(){
        
    }


}