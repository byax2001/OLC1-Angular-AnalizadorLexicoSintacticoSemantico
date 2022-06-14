import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { TypeRelacionales } from "./TypeRelacionales";

export class ORelacionales extends expresion{
    constructor(
        private left:expresion,
        private right:expresion,
        private typeRel:TypeRelacionales,
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error}
        const nodoIzq=this.left.execute(env);
        const nodoDer=this.right.execute(env);
        if(this.typeRel===TypeRelacionales.MAYORQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR  
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);     
            }
        }else if(this.typeRel===TypeRelacionales.MENORQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR   
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);     
            }
        }else if(this.typeRel===TypeRelacionales.MAYORIGUALQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value>=nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR   
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);     
            }
        }else if(this.typeRel===TypeRelacionales.MENORIGUALQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value<=nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR 
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);       
            }
        }else if(this.typeRel===TypeRelacionales.IGUALQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }else if(nodoIzq.type===Type.STRING && nodoDer.type===Type.STRING){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.BOOLEAN && nodoDer.type===Type.BOOLEAN){
                result={value:(nodoIzq.value===nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR 
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);       
            }
        }else if(this.typeRel===TypeRelacionales.DIFERENTEQUE){
            if(nodoIzq.type===Type.INT && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.INT && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.DOUBLE && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.INT){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.DOUBLE){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.CHAR && nodoDer.type===Type.CHAR){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }else if(nodoIzq.type===Type.STRING && nodoDer.type===Type.STRING){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }
            else if(nodoIzq.type===Type.BOOLEAN && nodoDer.type===Type.BOOLEAN){
                result={value:(nodoIzq.value!=nodoDer.value), type:Type.BOOLEAN}
            }else{
                //REPORTAR ERROR  
                B_datos.getInstance().addError("Semantico","Relacional no posible de realizar",this.line,this.column);      
            }
        }else{
            B_datos.getInstance().addError("Semantico","Operacion Relacional desconocida",this.line,this.column);  
        }
        return result
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let operacion = "";
        //QUE NI EL NODO DERECHO NI EL IZQUIERDO SEAN NULOS y si es negacion que el izquierdo no sea nulo
        if (this.typeRel === TypeRelacionales.MAYORQUE) {
            operacion = ">";
        } else if (this.typeRel === TypeRelacionales.MENORQUE) {
            operacion = "<";
        } else if (this.typeRel === TypeRelacionales.MAYORIGUALQUE) {
            operacion = ">=";
        } else if (this.typeRel === TypeRelacionales.MENORIGUALQUE) {
            operacion = "<=";
        } else if (this.typeRel === TypeRelacionales.IGUALQUE) {
            operacion = "==";
        } else if (this.typeRel === TypeRelacionales.DIFERENTEQUE) {
            operacion = "!=";
        } 
        let nodo = {
            id: id,
            label: operacion
        }
        B_datos.getInstance().addNodosAst(nodo);
        if (this.left !== null && this.right !== null) {
            //NODO IZQUIERDO
            let edge = {
                from: id,
                to:  `${id}${0}N${nivelHijo}`,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.left.ast(id, 0,nivel);
            //NODO DERECHO
            edge = {
                from: id,
                to: `${id}${1}N${nivelHijo}`,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.right.ast(id, 1,nivel);
        }
    }
}