import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Asignacion extends instruction{
    constructor(
        public id:string[],
        public expresion:expresion,
        line:number,
        column:number 
    ) {
        super(line,column)
    }
    public execute(env:Environment){  
        let exp=this.expresion.execute(env);
        if(exp.type!==Type.error){
            this.id.forEach((id)=>{
                let existe=env.existeSimbolo(id);
                if(existe===false){
                    //ERROR VARIABLE NO EXISTE
                    B_datos.getInstance().addError("Semantico","Variable no declarada",this.line,this.column); 
                    console.log("variable no declarada") 
                }else{
                    let simbolo=env.getSimbolo(id);
                    if(simbolo.constante===true){
                        //ERROR LA VARIABLE ES CONSTANTE
                        B_datos.getInstance().addError("Semantico","No se puede cambiar el valor, var Constante",this.line,this.column);  
                        if(simbolo.type!=exp.type){
                            //NO COINCIDIERON LOS TIPOS DE DATOS 
                            B_datos.getInstance().addError("Semantico","No coinciden los tipos de de datos",this.line,this.column)
                        }
                    }else{
                        if(simbolo.type===exp.type){
                            //COINCIDIERON LOS TIPOS DE DATOS, SE ACTUALIZA LA VARIABLE 
                            env.ChangeSimbolo(id,exp.value)
                        }else{
                            //NO COINCIDIERON LOS TIPOS DE DATOS 
                            B_datos.getInstance().addError("Semantico","No coinciden los tipos de de datos",this.line,this.column)
                        }
                    } 
                }
    
            })
        }else{
            B_datos.getInstance().addError("Semantico","Asignacion no posible de realizar",this.line,this.column)
        }
        
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
    //NODO ASIGNACION
        let nodo={
            id:id,
            label:"Instruction:\nAsignacion"
        }
        B_datos.getInstance().addNodosAst(nodo);
    //NODO DEL COJUNTO DE ID'S ASIGNADOS
    
        let nodoId={
            id:`${id}0N${nivelHijo}`, //Padre+0
            label:"ID:\n"+this.id.toString()
        }
        let edge={
            from:id,
            to:`${id}0N${nivelHijo}`,
        }
        B_datos.getInstance().addNodosAst(nodoId);
        B_datos.getInstance().addEdgesAst(edge);

    //NODO DE LA EXPRESION
        //Padre+1   
        edge={
            from:id,
            to:`${id}1N${nivelHijo}`,
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.expresion.ast(id,1,nivel);//NODO HIJO: EXPRESION
    }
}