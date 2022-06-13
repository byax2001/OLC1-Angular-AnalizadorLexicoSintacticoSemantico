import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

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
        let newEnv= new Environment(env); //Nuevo Enviroment
        this.AsigDec.execute(newEnv);    
        let inc_dec;
        let exp;
        do {
            exp = this.expresion.execute(env);//ANTERIOR ENVIROMENT
            newEnv= new Environment(env); //Nuevo Enviroment
            if (exp.type !== Type.error) {
                //SI LA EXPRESION NO DA UN ERROR ENTONCES SEGUIR
                if (exp.value) { //SI SIGUE SIENDO VERDADERA LA CONDICION SEGUIR ITERANDO
                    for (let Instruction of this.bloqueInst) {
                        if (Instruction instanceof Break) {
                            return null;
                        } else if (Instruction instanceof Continue) {
                            break;
                        } else if (Instruction instanceof Return) {
                            //REPORTAR ERROR 
                            B_datos.getInstance().addError("Semantico", "Sentencia Return en un for", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            B_datos.getInstance().addEnviroments("For",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                            return null;
                        }
                        Instruction.execute(newEnv);
                    }
                }
            } else {
                //EXPRESION DA ERROR EN FOR DETENER
                B_datos.getInstance().addError("Semantico", "Expresion genera un error en el for", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null;
            }
            inc_dec = this.incDec.execute(env);
            if (inc_dec.type === Type.error) {
                //INCREMENTO RETORNA UN ERROR DETENER 
                B_datos.getInstance().addError("Semantico", "Incremento genera un error en el for", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null
            }
            B_datos.getInstance().addEnviroments("For",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
        } while (exp.value);
    }
    public ast(){
        
    }
}