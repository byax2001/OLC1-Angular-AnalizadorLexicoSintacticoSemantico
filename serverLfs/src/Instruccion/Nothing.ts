import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

export class Nothing extends instruction{
    constructor(
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        return this;
    }
}