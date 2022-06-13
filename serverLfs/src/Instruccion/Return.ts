
import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction"
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment"
import { Type } from "../Symbols/Type";

export class Return extends instruction{
    expR:Retorno;
    constructor(
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column)
        this.expR={value:undefined,type:Type.error};
    }

    public execute(env:Environment){
        //this.bloque instanceof instruction;
        if(this.expresion!=null){
           this.expR=this.expresion.execute(env);
        }
        return this;     
    }
    public ast(){
        
    }
}