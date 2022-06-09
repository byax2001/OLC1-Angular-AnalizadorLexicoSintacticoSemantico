import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { TypeLogic } from "./TypeLogic";

export class OLogicas extends expresion{
    constructor(
        private left:expresion,
        private right:expresion,
        private typeLogic:TypeLogic,
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error}
        const nodoIzq=this.left.execute(env);
        const nodoDer=this.right.execute(env);
        if(this.typeLogic==TypeLogic.OR){
            if(nodoIzq.value==true){
                result={value:true, type:Type.BOOLEAN}
            }else{
                result={value:(nodoIzq || nodoDer), type:Type.BOOLEAN}
            }
        }else if(this.typeLogic==TypeLogic.AND){
            if(nodoIzq.value==false){
                result={value:false, type:Type.BOOLEAN}
            }else{
                result={value:(nodoIzq && nodoDer), type:Type.BOOLEAN}
            }
        }else if(this.typeLogic==TypeLogic.XOR){
            if(nodoIzq.value==true && nodoDer.value==false){
                result={value:true, type:Type.BOOLEAN}
            }else if(nodoIzq.value==false && nodoDer.value==true){
                result={value:true, type:Type.BOOLEAN}
            }else{
                result={value:false, type:Type.BOOLEAN}
            }
        }else if(this.typeLogic==TypeLogic.NOT){
            result={value:!nodoIzq, type: Type.BOOLEAN}
        }
        return result 

    }
}