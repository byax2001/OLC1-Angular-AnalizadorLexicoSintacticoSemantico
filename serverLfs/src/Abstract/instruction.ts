import { Environment } from "../Symbols/Environment";

export abstract class instruction{
    public constructor(
        public line:number,
        public column:number
    ){
        this.line=line;
        this.column=column;
    }
    
    public abstract execute(env:Environment):any;
    
}
