import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    constructor(
        public constante:boolean,
        public nombre:string,
        public tipo:Type,
        line:number,
        column:number 
    ) {
        super(line,column)
    }
    public execute(env:Environment){
        env.guardarVariable()
        console.log('acabo de guardar una variable')
        console.log(env);
    }
}