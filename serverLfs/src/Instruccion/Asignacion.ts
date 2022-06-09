import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    constructor(
        public nombre:string,
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)
    }
    public execute(env:Environment){
        let expresion=this.expresion.execute(env);
        
        console.log('acabo de guardar una variable')
        
    }
}