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
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\n Declaracion de Metodo"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //TIPO
        let tipo = "void"
        nodo = {
            id: `${id}${0}N${nivelHijo}`,
            label: tipo
        }
        let edge = {
            from: id,
            to: `${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //ID
        nodo = {
            id: `${id}${1}N${nivelHijo}`,
            label: this.id
        }
        edge = {
            from: id,
            to: `${id}${1}N${nivelHijo}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //PARAMETROS
        let n = 2
        if (this.parametros.length !== 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                let edge = {
                    from: id,
                    to: `${id}${n}N${nivelHijo}`,
                }
                n++;
                B_datos.getInstance().addEdgesAst(edge);
            }
            //NODOS INSTRUCCIONES
            n = 2;
            for (let i = 0; i < this.parametros.length; i++) {
                this.parametros[i].ast(id, n,nivel);
                n++;
            }
        }
        //INSTRUCCIONES
        let x;
        if(n!==2){ //SIGNIFICA QUE  HAY INSTRUCCIONES DE PARAMETROS
            x=n; //SE REPETIRIAN NODOS CON LAS INSTRUCCIONES DE ABAJO SI NO SE SIGUE CON LA SECUENCIA N RESULTANTE POR LOS PARAMETROS Y SE SUMA 1
        }else{
            x=2
        }
        n = x+1;
        for (let i = 0; i < this.instrucciones.length; i++) {
            let edge = {
                from: id,
                to: `${id}${n}N${nivelHijo}`,
            }
            n++;
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES  017n13n2
        n = x+1;
        for (let i = 0; i < this.instrucciones.length; i++) {
            this.instrucciones[i].ast(id, n,nivel);
            n++;
        }

    }
}