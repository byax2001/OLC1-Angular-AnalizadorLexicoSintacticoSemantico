import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class If extends instruction{

    constructor(
        public expresion:expresion,
        public instruction:instruction[],
        public instruction2:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }


    public execute(env: Environment) {
        let result = this.expresion.execute(env);
        //NO TIENE QUE GENERAR ERRORES LA EXPRESION Y TIENE QUE SER POR FUERZAS UN TIPO BOOLEANO
        if (result.type !== Type.error && result.type === Type.BOOLEAN) {
            let newEnviromet= new Environment(env);
            if (result.value === true) {
                for (let i = 0; i < this.instruction.length; i++) {
                    if(this.instruction[i] instanceof Return || this.instruction[i] instanceof Break || this.instruction[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        return null; 

                    }
                    const res = this.instruction[i].execute(newEnviromet);
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            } else {
                for (let i = 0; i < this.instruction2.length; i++) {
                    if(this.instruction2[i] instanceof Return || this.instruction2[i] instanceof Break || this.instruction2[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break, Return o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        return null; 
                    }
                    const res = this.instruction2[i].execute(newEnviromet);
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            }
        } else {
            //EXPRESION GENERA ERROR EN EL IF 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el if, el resultado debe de ser booleano",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
            return null
        }
        return null;
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction:\nIf"
        }
        B_datos.getInstance().addNodosAst(nodo);
    //NODO "IF"
        nodo={
            id:id+""+0,
            label:"if"
        }
        let edge={
            from:id,
            to:id+""+0
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //INSTRUCCIONES IF
        
        for(let i=0; i<this.instruction.length; i++){
            let edge={
                from:id+"0",
                to:id+"0"+i,
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instruction.length; i++){
            this.instruction[i].ast(id+"0",i);
            
        }
    //"ELSE" 
        nodo={
            id:id+""+1,
            label:"else"
        }
        edge={
            from:id,
            to:id+""+1
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //INSTRUCCIONES ELSE
        for(let i=0; i<this.instruction2.length; i++){
            let edge={
                from:id+"1",
                to:id+"1"+i,
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instruction2.length; i++){
            this.instruction2[i].ast(id+"1",i);
        } 
    }


}