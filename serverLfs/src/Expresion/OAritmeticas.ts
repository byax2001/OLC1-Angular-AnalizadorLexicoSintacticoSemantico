import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
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
        let result:Retorno={value:null,type:Type.error}
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
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);    
            }
        }else if (this.typeArit==TypeAritmeticas.RESTA){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value-nodoDer.value), type:Type.INT}
            }else{
                //REPORTAR ERROR   
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);    
            }
        } else if (this.typeArit==TypeAritmeticas.MULTIPLICACION){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value*nodoDer.value), type:Type.INT}
            }else{
                //REPORTAR ERROR   
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);    
            }
        } else if (this.typeArit==TypeAritmeticas.DIVISION){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.INT}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value/nodoDer.value), type:Type.INT}
            }else{
                //REPORTAR ERROR  
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);     
            }
        }else if (this.typeArit==TypeAritmeticas.POW){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:Math.pow(nodoIzq.value,nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:Math.pow(nodoIzq.value,nodoDer.value), type:Type.DOUBLE}
            }else{
                //REPORTAR ERROR  
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);     
            }
        }else if(this.typeArit=TypeAritmeticas.MOD){
            if(nodoIzq.type==Type.INT && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INT && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INT){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result={value:(nodoIzq.value%nodoDer.value), type:Type.DOUBLE}
            }else{
                //REPORTAR ERROR  
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);     
            }
        }else if(this.typeArit=TypeAritmeticas.NEGACION){
            if(nodoIzq.type==Type.INT){
                result={value:-nodoIzq.value, type:Type.INT}
            }else if(nodoIzq.type==Type.DOUBLE){
                result={value:-nodoIzq.value, type:Type.DOUBLE}
            }else{
                //REPORTAR ERROR   
                B_datos.getInstance().addError("Semantico","Operacion no posible de realizar",this.line,this.column);    
            }
        }
        return result
    }
}