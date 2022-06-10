import { instruction } from "../Abstract/instruction"
import { Environment } from "../Symbols/Environment"

export class Inst_continue extends instruction{
    constructor(
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment){
        //this.bloque instanceof instruction;
        return this;
    }



}