import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
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
                        }
                        this.bloqueInst[i].execute(newEnv); //CON EL NUEVO ENVIROMENT
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
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction: While"
        }
        B_datos.getInstance().addNodosAst(nodo);

        //EDGES CON INSTRUCCIONES
        for(let i=0; i<this.bloqueInst.length; i++){
            let edge={
                from:id,
                to:id+""+i,
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.bloqueInst.length; i++){
            this.bloqueInst[i].ast(id,i);
        }
    }
}