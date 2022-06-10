import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

export class Typeof extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        
        let exp=this.expresion.execute(env);
        let tipoDato:Retorno={value:null,type:Type.error}
        if(exp.type==Type.INT){
            tipoDato={value:"int",type:Type.STRING}
        }else if(exp.type==Type.DOUBLE){
            tipoDato={value:"double",type:Type.STRING}
        }else if(exp.type==Type.CHAR){
            tipoDato={value:"char",type:Type.STRING}
        }else if(exp.type==Type.BOOLEAN){
            tipoDato={value:"boolean",type:Type.STRING}
        }else if(exp.type==Type.STRING){
            tipoDato={value:"string",type:Type.STRING}
        }
        return tipoDato
    }
}