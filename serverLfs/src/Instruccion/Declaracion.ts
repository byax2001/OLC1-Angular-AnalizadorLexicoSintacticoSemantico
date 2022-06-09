import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Declaracion extends instruction{
    constructor(
        public constante:boolean,
        public tipo:Type,
        public nombre:string,
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)
    }
    public execute(env:Environment){
        let exp=this.expresion.execute(env);
        env.guardarSimbolo(this.constante,this.tipo,this.nombre,exp.value,this.line,this.column);
        console.log('acabo de guardar una variable')
        console.log(env);
    }
}