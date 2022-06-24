import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Graficarts } from "./graficarTs";
import { If } from "./If";
import { Return } from "./Return";

export class While extends instruction  {
    constructor(
        public expresion:expresion,
        public bloqueInst:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let exp;
        do {
            exp = this.expresion.execute(env); //ENVIROMENT ANTERIOR
            let newEnv= new Environment(env); //Nuevo Enviroment
            if (exp.type !== Type.error && exp.type===Type.BOOLEAN) {
                if (exp.value === true) {
                    for (let i = 0; i < this.bloqueInst.length; i++) {
                        if(this.bloqueInst[i] instanceof Break ){
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
                            this.bloqueInst[i].execute(newEnv); //CON EL NUEVO ENVIROMENT
                        }

                        if (this.bloqueInst[i] instanceof Graficarts) {
                            //GRAFICAR_TS()
                            B_datos.getInstance().addEnviromentsEsp("While",newEnv)
                        }
                    }
                }
                B_datos.getInstance().addEnviroments("While",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            } else {
                //SI SI GENERA UN ERROR SALIRSE DE LA EJECUCION Y NO HACER NADA 
                B_datos.getInstance().addError("Semantico", "Expresion genera error en el While, el resultado debe de ser booleano", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
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
            label:"Instruction:\nWhile"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //NODO CON LA EXPRESION
        this.expresion.ast(id,0,nivel);
        
        //EDGE CON LA EXRESION
        let edge={
            from:id,
            to:`${id}${0}N${nivelHijo}`,
        }
        B_datos.getInstance().addEdgesAst(edge);
        //EDGES CON INSTRUCCIONES

        let n=1;
        for(let i=0; i<this.bloqueInst.length; i++){
            let edge={
                from:id,
                to:`${id}${n}N${nivelHijo}`,
            }
            n++;
            B_datos.getInstance().addEdgesAst(edge);
        }
        n=1;
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.bloqueInst.length; i++){
            this.bloqueInst[i].ast(id,n,nivel);
            n++;
        }
    }
}