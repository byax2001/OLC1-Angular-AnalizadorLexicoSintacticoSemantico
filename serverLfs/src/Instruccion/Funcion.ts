import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Funcion extends instruction {
    constructor(
        public tipo: Type,
        public id: string,
        public parametros: instruction[],
        public instrucciones: instruction[],
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        let existeM = env.existeSimbolo(this.id);
        if (existeM == false) {
            //INGRESAR NUEVO METODO
            env.guardarSimboloMF(true, this.tipo, this.id, [this.parametros, this.instrucciones], this.line, this.column, this.parametros.length);
        } else {
            B_datos.getInstance().addError("Semantico", "Intento de guardar una funcion ya existente", this.line, this.column);
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
        let tipo = "any"
        if (this.tipo === Type.INT) {
            tipo = "int"
        } else if (this.tipo === Type.DOUBLE) {
            tipo = "double"
        } else if (this.tipo === Type.CHAR) {
            tipo = "char"
        } else if (this.tipo === Type.BOOLEAN) {
            tipo = "boolean"
        } else if (this.tipo === Type.STRING) {
            tipo = "string"
        }
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
        //PARAMETROS, PUEDE QUE NO VENGAN PARAMETROS
        let n = 2
        if (this.parametros.length != 0) {
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

