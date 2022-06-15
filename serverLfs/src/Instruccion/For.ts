import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class For extends instruction{
    constructor(
        public AsigDec: instruction,//asignacion o declaracion
        public expresion: expresion, //expresion
        public incDec: expresion, //incremento o decremento,
        public bloqueInst: instruction[],
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env: Environment) {
        let newEnv= new Environment(env); //Nuevo Enviroment
        this.AsigDec.execute(newEnv);    
        let inc_dec;
        let exp;
        do {
            let newEnv2= new Environment(newEnv); //Nuevo Enviroment procedente del anterior nuevo, este se pierde no importa
            exp = this.expresion.execute(newEnv);//ANTERIOR ENVIROMENT
            
            if (exp.type !== Type.error && exp.type===Type.BOOLEAN) {
                //SI LA EXPRESION NO DA UN ERROR ENTONCES SEGUIR
                if (exp.value) { //SI SIGUE SIENDO VERDADERA LA CONDICION SEGUIR ITERANDO
                    for (let Instruction of this.bloqueInst) {
                        if (Instruction instanceof Break) {
                            return null;
                        } else if (Instruction instanceof Continue) {
                            break;
                        } else if (Instruction instanceof Return) {
                            //REPORTAR ERROR 
                            B_datos.getInstance().addError("Semantico", "Sentencia Return en un for", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            B_datos.getInstance().addEnviroments("For",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                            return null;
                        }
                        Instruction.execute(newEnv2);
                    }
                }
            } else {
                //EXPRESION DA ERROR EN FOR DETENER
                B_datos.getInstance().addError("Semantico", "Comparacion genera un error en el for, el resultado debe de ser booleano", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null;
            }
            inc_dec = this.incDec.execute(newEnv);
            if (inc_dec.type === Type.error) {
                //INCREMENTO RETORNA UN ERROR DETENER 
                B_datos.getInstance().addError("Semantico", "Incremento genera un error en el for", this.line, this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                return null
            }
            B_datos.getInstance().addEnviroments("For",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
        } while (exp.value);
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo={
            id:id,
            label:"Instruction:\nFor"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //ASIGNACION
        let edge={
            from:id,
            to:`${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.AsigDec.ast(id,0,nivel);
        //EXPRESION
        edge={
            from:id,
            to:`${id}${1}N${nivelHijo}`,
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.expresion.ast(id,1,nivel);
        //INCREMENTO/DECREMENTO
        edge={
            from:id,
            to:`${id}${2}N${nivelHijo}`,
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.incDec.ast(id,2,nivel);
        //INSTRUCCIONES
        let n=3
        for(let i=0; i<this.bloqueInst.length; i++){
            let edge={
                from:id,
                to:`${id}${n}N${nivelHijo}`,
            }
            n++;
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        n=3;
        for(let i=0; i<this.bloqueInst.length; i++){
            this.bloqueInst[i].ast(id,n,nivel);
            n++;
        }
    }
}