import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Dowhile extends instruction{
    constructor(
        public expresion: expresion,
        public bloqueInst:instruction[],
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env: Environment) {
        for (let Instruccion of this.bloqueInst) {
            Instruccion.execute(env);
        }
        let exp;
        do {
            exp = this.expresion.execute(env);
            if (exp.type !== Type.error) {
                //SI LA EXPRESION NO GENERA ALGUN ERROR OPERAR NORMAL
                if (exp.value === true) {
                    for (let i = 0; i < this.bloqueInst.length; i++) {
                        this.bloqueInst[i].execute(env);
                    }
                }
            }else{
                //SI SI GENERA UN ERROR SALIRSE DE LA EJECUCION Y NO HACER NADA 
                B_datos.getInstance().addError("Semantico","Error en la expresion para el Do While",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null; 
            }
        } while (exp.value)
        return null;
    }

}