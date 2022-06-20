import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class ToUpper extends expresion{
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
        if(exp.type===Type.STRING){
            result={value:String(exp.value).toUpperCase(),type:Type.STRING};
        }else{  
            //REPORTAR ERROR
            B_datos.getInstance().addError("Semantico","Intento de hacer toUpperCase a un no String",this.line,this.column);
        }
        return result
    }
    public ast(){

    }
}