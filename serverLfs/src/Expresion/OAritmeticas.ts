import { expresion } from "../Abstract/Expresion";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { TypeAritmeticas } from "./TypeAritmeticas";

export class OAritmeticas extends expresion{
    constructor(
        private left:expresion,
        private right:expresion,
        private typeArit: TypeAritmeticas,
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment):Retorno{
        let result:Retorno
        const nodoIzq=this.left.execute(env);
        const nodoDer=this.right.execute(env);
        if(this.typeArit==TypeAritmeticas.SUMA){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.STRING){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.STRING){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value+nodoDer.value), type:Type.CHAR}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.STRING){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }
            else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
                result={value:(nodoIzq.value+""+nodoDer.value), type:Type.STRING}
            }else{
                //REPORTAR ERROR   
            }
        }
        result={value:nodoIzq.value, type:Type.BOOLEAN}

        return result
    }
}