import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

export class I_for extends instruction{
    constructor(
        public AsigDec: instruction,//asignacion o declaracion
        public expresion: expresion, //expresion
        public incDec: instruction, //incremento o decremento,
        public bloqueInst: instruction,
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env: Environment){
        let asigDec=this.AsigDec.execute(env);
        let exp= this.expresion.execute(env);
        let inc_dec= this.incDec.execute(env);
        
        
    }
}