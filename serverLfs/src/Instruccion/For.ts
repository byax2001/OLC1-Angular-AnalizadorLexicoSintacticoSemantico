import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class For extends instruction{
    constructor(
        public AsigDec: instruction,//asignacion o declaracion
        public expresion: expresion, //expresion
        public incDec: expresion, //incremento o decremento,
        public bloqueInst: instruction[],
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env: Environment) {
        this.AsigDec.execute(env);
        let inc_dec;
        let exp;
        do {
            exp = this.expresion.execute(env);
            if (exp.type !== Type.error) {
                //SI LA EXPRESION NO DA UN ERROR ENTONCES SEGUIR
                if (exp.value) {
                    for (let Instruction of this.bloqueInst) {
                        Instruction.execute(env);
                    }
                }
            } else {
                //EXPRESION DA ERROR EN FOR DETENER
                B_datos.getInstance().addError("Semantico","Expresion genera un error en el for",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null;
            }
            inc_dec = this.incDec.execute(env);
            if (inc_dec.type === Type.error) {
                //INCREMENTO RETORNA UN ERROR DETENER 
                B_datos.getInstance().addError("Semantico","Incremento genera un error en el for",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null
            }
        } while (exp.value);
    }
}