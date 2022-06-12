
import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction"
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment"
import { Type } from "../Symbols/Type";

export class Return extends instruction{
    constructor(
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment){
        //this.bloque instanceof instruction;
        let _return:Retorno={value:null,type:Type.error}
        if(this.expresion!=null){
           let exp=this.expresion.execute(env);
           _return={value:exp.value,type:exp.type}
        }
        else{
            return this;
        }        
    }
}