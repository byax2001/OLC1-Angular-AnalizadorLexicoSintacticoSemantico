import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

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
            if (result.value === true) {
                for (let i = 0; i < this.instruction.length; i++) {
                    const res = this.instruction[i].execute(env);

                }
            } else {

                for (let i = 0; i < this.instruction2.length; i++) {
                    const res = this.instruction2[i].execute(env);
                }
            }
        } else {
            //EXPRESION GENERA ERROR EN EL IF 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el if",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
            return null
        }
        return null;
    }


}