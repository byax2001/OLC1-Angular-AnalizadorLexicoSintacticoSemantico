import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

export class BloqueInstSup extends instruction{
    constructor(
        public instrucciones:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        for(let Instruccion of this.instrucciones){
            Instruccion.execute(env);
        }
    }
}