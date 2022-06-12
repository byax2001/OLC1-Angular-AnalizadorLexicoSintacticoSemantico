import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

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
    public execute(env: Environment){
        let asigDec=this.AsigDec.execute(env);
        let inc_dec;
        let exp;
        do{
            exp= this.expresion.execute(env);
            if(exp.value){
                for(let Instruction of this.bloqueInst){
                    Instruction.execute(env);
                }
            }
            inc_dec= this.incDec.execute(env);
        }while(exp.value); 
    }
}