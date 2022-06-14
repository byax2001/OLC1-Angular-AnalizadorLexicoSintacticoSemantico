import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Metodo extends instruction{
    constructor(
        public id: string,
        public parametros: instruction[],
        public instrucciones:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        let existeM=env.existeSimbolo(this.id);
        if(existeM==false){
            //INGRESAR NUEVO METODO
            env.guardarSimboloMF(true,Type.VOID,this.id,[this.parametros,this.instrucciones],this.line,this.column,this.parametros.length);
        }else{
            let metodo=env.getFunMetodo(this.id,this.parametros.length);
            if(metodo.type==Type.VOID){ //SI ES TIPO VOID ENTONCES SI ES UN METODO
                if(metodo.nParametros!=this.parametros.length){ //nparamteros distintos, distintos metodos
                    //INGREAR NUEVO METODO 
                    env.guardarSimboloMF(true,Type.VOID,this.id,[this.parametros,this.instrucciones],this.line,this.column,this.parametros.length);
                }else{
                    //REPORTAR ERROR 
                    B_datos.getInstance().addError("Semantico","Intento de guardar un metodo ya existente",this.line,this.column);
                }
            }
        }
        
    }
    public ast(idPadre: string, NoHijo: number) {
        let id = idPadre + "" + NoHijo;
        let nodo = {
            id: id,
            label: "Instruction: Declaracion de Funcion"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //TIPO
        let tipo = "void"
        nodo = {
            id: id + "" + 0,
            label: tipo
        }
        let edge = {
            from: id,
            to: id + "" + 0
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //ID
        nodo = {
            id: id + "" + 1,
            label: this.id
        }
        edge = {
            from: id,
            to: id + "" + 1
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //PARAMETROS
        let n = 2
        if (this.parametros.length !== 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                let edge = {
                    from: id,
                    to: id + "" + n,
                }
                n++;
                B_datos.getInstance().addEdgesAst(edge);
            }
            //NODOS INSTRUCCIONES
            n = 2;
            for (let i = 0; i < this.parametros.length; i++) {
                this.parametros[i].ast(id, n);
                n++;
            }
        }
        //INSTRUCCIONES
        n = 3
        for (let i = 0; i < this.instrucciones.length; i++) {
            let edge = {
                from: id,
                to: id + "" + n,
            }
            n++;
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        n = 3;
        for (let i = 0; i < this.instrucciones.length; i++) {
            this.instrucciones[i].ast(id, n);
            n++;
        }

    }
}