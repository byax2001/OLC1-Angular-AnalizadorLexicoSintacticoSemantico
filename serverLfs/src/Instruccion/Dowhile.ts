import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { If } from "./If";
import { Return } from "./Return";

export class Dowhile extends instruction{
    constructor(
        public expresion: expresion,
        public bloqueInst:instruction[],
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env: Environment) {
        let newEnv= new Environment(env); //Nuevo Enviroment
        for (let Instruccion of this.bloqueInst) {
            if(Instruccion instanceof Break ){
                return null; 
            }else if(Instruccion instanceof Return || Instruccion instanceof Continue){
                //REPORTAR ERROR 
                B_datos.getInstance().addError("Semantico","Sentencia Return o Continue en un While",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null; 
            }else if(Instruccion instanceof If){
                let estadoIf= Instruccion.execute(newEnv); //SI DEVUELVE UN BREAK, ES QUE EXISTIA UNO EN SU HABER QUE SE CUMPLIO EN ESE CASO DAR
                if(estadoIf instanceof Break){
                    return null; 
                }
            }else{
                Instruccion.execute(newEnv);
            }
        }
        let exp;
        do {
            exp = this.expresion.execute(env);
            newEnv= new Environment(env); //Nuevo Enviroment
            if (exp.type !== Type.error && exp.type===Type.BOOLEAN) {
                //SI LA EXPRESION NO GENERA ALGUN ERROR OPERAR NORMAL
                if (exp.value === true) {
                    for (let i = 0; i < this.bloqueInst.length; i++) {
                        if(this.bloqueInst[i]instanceof Break ){
                            return null; 
                        }else if(this.bloqueInst[i] instanceof Return || this.bloqueInst[i] instanceof Continue){
                            //REPORTAR ERROR 
                            B_datos.getInstance().addError("Semantico","Sentencia Return o Continue en un While",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            return null; 
                        }else if(this.bloqueInst[i] instanceof If){
                            let estadoIf= this.bloqueInst[i].execute(newEnv);
                            if(estadoIf instanceof Break){
                                return null; 
                            }
                        }else{
                            this.bloqueInst[i].execute(newEnv);
                        }
                    }
                }
                B_datos.getInstance().addEnviroments("doWhile",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            }else{
                //SI SI GENERA UN ERROR SALIRSE DE LA EJECUCION Y NO HACER NADA 
                B_datos.getInstance().addError("Semantico","Expresion genera error en el Do While, el resultado debe de ser booleano",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS4
                B_datos.getInstance().addEnviroments("doWhile",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                return null; 
            }
        } while (exp.value)
        return null;
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo={
            id:id,
            label:"Instruction:\nDoWhile"
        }
        B_datos.getInstance().addNodosAst(nodo);

        //EDGES CON INSTRUCCIONES
        for(let i=0; i<this.bloqueInst.length; i++){
            let edge={
                from:id,
                to:`${id}${i}N${nivelHijo}`
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.bloqueInst.length; i++){
            this.bloqueInst[i].ast(id,i,nivel);
        }
    }

}