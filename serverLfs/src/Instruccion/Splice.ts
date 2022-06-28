import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import {Retorno} from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";

export class Splice extends instruction {
    constructor(
        public id: string,
        public index:expresion,
        public dato:expresion,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(env: Environment) { 
        let vec = env.getSimbolo(this.id);
        let index= this.index.execute(env);
        let dato=this.dato.execute(env);
        if (vec.type !== Type.error && typeof vec.value === "object" && dato.type!==Type.error) {
            if(index.type===Type.INT){
                if (vec.value.filas === 1) { 
                    if(index.value<vec.value.columnas){
                        if(vec.type===dato.type){
                            let valor:Retorno={value:dato.value,type:dato.type}
                            vec.value.value[0].splice(index.value,0,valor);
                            vec.value.columnas=vec.value.value[0].length; //SE AGREGO UN ELEMENTO, MODIFICAR NUMERO DE COLUMNAS
                        }else{
                            //INTENTO DE HACER SPLICE DE UN DATO EN UN VECTOR DE TIPO DISTINTO
                            B_datos.getInstance().addError("Semantico","Intento de ingresar un dato de tipo distinto al del vector",this.line,this.column);
                        }
                    }else{
                        //INTENTO DE HACER UN SPLICE EN UN INDEX INEXISTENTE
                        B_datos.getInstance().addError("Semantico","Index fuera del tamaño del vector",this.line,this.column);
                    }
                }else{
                    //REPORTAR ERROR intento de hacer splice en un vector de dos dimensiones
                    B_datos.getInstance().addError("Semantico","Intento de hacer splice a un vector de dos dimensiones",this.line,this.column);
                }
            }else{
                //EL INDEX NO ES UN INT 
                B_datos.getInstance().addError("Semantico","Index no es un int",this.line,this.column);
            }
            
        }else{
            //REPORTAR ERROR 
            B_datos.getInstance().addError("Semantico","La expresion o vector a ingresar da error, o la variable a manipular no es un vector",this.line,this.column);
        }
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nSplice"
        }
        B_datos.getInstance().addNodosAst(nodo);
        nodo = {
            id: `${id}0N${(nivel+1)}`,
            label:`Vector: ${this.id}`
        }
        let edge = {
            from: id,
            to:`${id}0N${(nivel+1)}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //INDEX 
        edge = {
            from: id,
            to:`${id}1N${(nivel+1)}`
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.index.ast(id,1,nivel);
        //DATO A INGRESAR 
        edge = {
            from: id,
            to:`${id}2N${(nivel+1)}`
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.dato.ast(id,2,nivel);
    }
}
