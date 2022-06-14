import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
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
        if(this.typeLogic===TypeLogic.OR){
            if(nodoIzq.type===Type.BOOLEAN && nodoDer.type===Type.BOOLEAN){
                if(nodoIzq.value===true){
                    result={value:true, type:Type.BOOLEAN}
                }else{
                    result={value:(nodoIzq || nodoDer), type:Type.BOOLEAN}
                }
            }else{
                //REPORTE DE ERROR OR EN ELEMENTOS NO BOOLEANOS 
                B_datos.getInstance().addError("Semantico","Or en elementos no booleanos",this.line,this.column);  
            }
        }else if(this.typeLogic===TypeLogic.AND){
            if(nodoIzq.type===Type.BOOLEAN && nodoDer.type===Type.BOOLEAN){
                if(nodoIzq.value===false){
                    result={value:false, type:Type.BOOLEAN}
                }else{
                    result={value:(nodoIzq && nodoDer), type:Type.BOOLEAN}
                }
            }else{
                //REPORTE DE ERROR OR EN ELEMENTOS NO BOOLEANOS 
                B_datos.getInstance().addError("Semantico","And en elementos no booleanos",this.line,this.column);  
            }
        }else if(this.typeLogic===TypeLogic.XOR){
            if(nodoIzq.type===Type.BOOLEAN && nodoDer.type===Type.BOOLEAN){
                if(nodoIzq.value===true && nodoDer.value===false){
                    result={value:true, type:Type.BOOLEAN}
                }else if(nodoIzq.value===false && nodoDer.value===true){
                    result={value:true, type:Type.BOOLEAN}
                }else{
                    result={value:false, type:Type.BOOLEAN}
                }
            }else{
                //REPORTE DE ERROR OR EN ELEMENTOS NO BOOLEANOS 
                B_datos.getInstance().addError("Semantico","Xor en elementos no booleanos",this.line,this.column);
            }
        }else if(this.typeLogic===TypeLogic.NOT){
            if(nodoIzq.type===Type.BOOLEAN){
                result={value:!nodoIzq, type: Type.BOOLEAN}
            }else{
                //REPORTE DE ERROR OR EN ELEMENTOS NO BOOLEANOS 
                B_datos.getInstance().addError("Semantico","Not en elemento no booleano",this.line,this.column);
            }
        }else{
            B_datos.getInstance().addError("Semantico","Operacion desconocida",this.line,this.column);  
        }
        return result 

    }
    public ast(idPadre: string, NoHijo: number) {
        let id = idPadre + "" + NoHijo;
        let operacion = "";
        //QUE NI EL NODO DERECHO NI EL IZQUIERDO SEAN NULOS y si es negacion que el izquierdo no sea nulo
        if (this.typeLogic === TypeLogic.AND) {
            operacion = "And";
        } else if (this.typeLogic === TypeLogic.OR) {
            operacion = "Or";
        } else if (this.typeLogic === TypeLogic.XOR) {
            operacion = "Xor";
        } else if (this.typeLogic === TypeLogic.NOT) {
            operacion = "Not";
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
                to: id + "" + 0,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.left.ast(id, 0);
            //NODO DERECHO
            edge = {
                from: id,
                to: id + "" + 1,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.right.ast(id, 1);
        }else if (this.left !== null){
            //NODO IZQUIERDO
            let edge = {
                from: id,
                to: id + "" + 0,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.left.ast(id, 0);
        }
    }
}