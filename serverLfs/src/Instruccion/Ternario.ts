import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Ternario extends instruction{
    constructor(
        public expresion: expresion,
        public bloque1:any,
        public bloque2:any,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let result:Retorno={value:null, type:Type.error};
        if(this.bloque1 instanceof instruction && this.bloque2 instanceof instruction){
            let exp=this.expresion.execute(env);
            if(exp.type===Type.BOOLEAN){
                if(exp.value){
                    this.bloque1.execute(env);
                }else{
                    this.bloque2.execute(env);
                }
            }else{
                //REPORTAR ERROR 
                B_datos.getInstance().addError("Semantico","La expresion debe de dar un resultado booleano",this.line,this.column);
            }
        }else if(this.bloque1 instanceof expresion && this.bloque2 instanceof expresion){
            let exp=this.expresion.execute(env);
            if(exp.type===Type.BOOLEAN){
                if(exp.value){
                    result=this.bloque1.execute(env);
                }else{
                    result=this.bloque2.execute(env);
                }
            }else{
                //REPORTAR ERROR 
                B_datos.getInstance().addError("Semantico","La expresion debe de dar un resultado booleano",this.line,this.column);
            }
        }else{
            B_datos.getInstance().addError("Semantico","Las opciones deben de ser o solo expresiones o solo instrucciones",this.line,this.column);
        }
        return result
    }


    public ast(){

    }
}