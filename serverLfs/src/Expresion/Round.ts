import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Round extends expresion{
    constructor(
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error}
        let exp=this.expresion.execute(env);
        if(exp.type===Type.DOUBLE){
            result={value:Math.round(Number(exp.value)),type:Type.INT};
        }else{  
            //REPORTAR ERROR
            B_datos.getInstance().addError("Semantico","Intento de hacer round a un no double",this.line,this.column);
        }
        return result
    }

    public ast(){

    }
}