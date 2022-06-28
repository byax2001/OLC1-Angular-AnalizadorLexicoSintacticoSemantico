import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Graficarts } from "./graficarTs";
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
        let newEnviromet= new Environment(env);
        let retInf=null;
        //NO TIENE QUE GENERAR ERRORES LA EXPRESION Y TIENE QUE SER POR FUERZAS UN TIPO BOOLEANO
        if (result.type !== Type.error && result.type === Type.BOOLEAN) {
            if (result.value === true) {
                for (let i = 0; i < this.instruction.length; i++) {
                    if(this.instruction[i] instanceof Return || this.instruction[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        break;
                    } else if(this.instruction[i] instanceof Break){
                        //RETORNA BREAK EL IF PARA PARALIZAR CICLOS QUE LO CONTENGAN
                        retInf=this.instruction[i]; 
                    }else if(this.instruction[i] instanceof If){
                        let estadoIf= this.instruction[i].execute(newEnviromet);
                        if(estadoIf instanceof Break){ //PARA SABER SI EN ALGUN IF VENIA LA INSTRUCCION BREAK 
                            retInf=estadoIf;  
                            return retInf;
                        }
                    }else{
                        this.instruction[i].execute(newEnviromet);
                    }  
                    if (this.instruction[i] instanceof Graficarts) {
                        //GRAFICAR_TS()
                        B_datos.getInstance().addEnviromentsEsp("If",newEnviromet)
                    }
                    
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            } else {
                for (let i = 0; i < this.instruction2.length; i++) {
                    if(this.instruction2[i] instanceof Return || this.instruction2[i] instanceof Continue){
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Sentencia Break, Return o Continue en If",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                        break;
                    }else if(this.instruction2[i] instanceof Break){
                        //RETORNA BREAK EL IF PARA PARALIZAR CICLOS QUE LO CONTENGAN
                        retInf= this.instruction2[i];
                        break; 
                    }else if(this.instruction2[i] instanceof If){
                        let estadoIf= this.instruction2[i].execute(newEnviromet);
                        if(estadoIf instanceof Break){
                            retInf=estadoIf; //SI EL RESULTADO DE ESE IF ES UN BREAK RETORNAR UN BREAK 
                            return retInf;
                        }
                    }else{
                        const res = this.instruction2[i].execute(newEnviromet);
                    }
                    if (this.instruction2[i] instanceof Graficarts) {
                        //GRAFICAR_TS()
                        B_datos.getInstance().addEnviromentsEsp("If",newEnviromet)
                    }
                     
                }
                B_datos.getInstance().addEnviroments("If",newEnviromet);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
            }
        } else {
            //EXPRESION GENERA ERROR EN EL IF 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el if, el resultado debe de ser booleano",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
            return null
        }
        return retInf;
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo={
            id:id,
            label:"Instruction:\nIf"
        }
        B_datos.getInstance().addNodosAst(nodo);
    //EXPRESION
    
    //NODO "IF"
        nodo={
            id:`${id}${0}N${nivelHijo}`,
            label:"if"
        }
        let edge={
            from:id,
            to:`${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //INSTRUCCIONES IF
        
        for(let i=0; i<this.instruction.length; i++){
            let edge={
                from:`${id}${0}N${nivelHijo}`,
                to:`${id}${0}N${nivelHijo}`+i+"N"+(nivelHijo+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instruction.length; i++){
            this.instruction[i].ast(`${id}${0}N${nivelHijo}`,i,nivelHijo);
            
        }
    //"ELSE" 
        nodo={
            id:`${id}${1}N${nivelHijo}`,
            label:"else"
        }
        edge={
            from:id,
            to:`${id}${1}N${nivelHijo}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        //INSTRUCCIONES ELSE
        for(let i=0; i<this.instruction2.length; i++){
            let edge={
                from:`${id}${1}N${nivelHijo}`,
                to:`${id}${1}N${nivelHijo}`+i+"N"+(nivelHijo+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instruction2.length; i++){
            this.instruction2[i].ast(`${id}${1}N${nivelHijo}`,i,nivelHijo);
        } 
    }


}