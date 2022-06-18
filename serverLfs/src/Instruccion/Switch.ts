import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Break } from "./Break";
import { Case } from "./Case";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class Switch extends instruction{
    constructor(
        public expresion:expresion,
        public caselist:any[],
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let indexCase = -1;
        let indexDefault = -1;
        let expSwitch = this.expresion.execute(env);
        if (expSwitch.type !== Type.error) {
            //PARA SABER SI EXISTE ALGUN CASE ENTRE EL CONJUNTO DE INSTRUCCIONES QUE CUMPLA CON LA EXPRESION Y ENCONTRAR SU POSICION EN EL ARRAY DE INSTRUCCIONES
            for (let i = 0; i < this.caselist.length; i++) {
                if (this.caselist[i] instanceof Case) {
                    let caseExp = this.caselist[i].rExpresion(env);
                    if (caseExp.value == expSwitch.value && caseExp.type == expSwitch.type) {
                        //POSICION DEL CASE QUE CUMPLE CON LA CONDICION SOLICITADA
                        indexCase = i;
                    }
                } else {
                    //POSICION DEL DEFAULT EN EL ARREGLO SI ES QUE EXISTE
                    indexDefault = i;
                }
            }

            if (indexCase === -1) { //NO HAY CASE QUE CUMPLA CON LA CONDICION
                if (indexDefault !== -1) {//SI EXISTE UN DEFAULT EMPEZARA DESDE AHI LA EJECUCION DE INSTRUCCIONES
                    indexCase = indexDefault
                } else {
                    //REPORTAR ERROR Y MANDAR NULL, NO HAY NI CASE NI DEFAULT PARA EL SWITCH
                    B_datos.getInstance().addError("Semantico","No hay ni case ni default para el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                    return null
                }
            }

            let newEnv= new Environment(env); //Nuevo Enviroment
            for (let x = indexCase; x < this.caselist.length; x++) {
                if (this.caselist[x] instanceof Case) { //SI ES UN TIPO CASE 
                    let caseJstament = this.caselist[x].execute(newEnv);//EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                    if (caseJstament != null) { //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                        if (caseJstament instanceof Break) {
                            break;
                        } else {
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            B_datos.getInstance().addError("Semantico","Salto de sentencia incorrecto para el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            return null;
                        }
                    }
                } else { //SI ES EL DEFAULT 
                    for (let instDefault of this.caselist[x]) {
                        if (instDefault instanceof Break) {
                            break;
                        } else if (instDefault instanceof Return || instDefault instanceof Continue) {
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            B_datos.getInstance().addError("Semantico","Salto de sentencia incorrecto para el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            return null;
                        } else {
                            instDefault.execute(newEnv);
                        }
                    }
                }
            }
            B_datos.getInstance().addEnviroments("Switch",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
        }else{
            //EXPRESION GENERA ERROR EN EL SWITCH 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
        }
        return null;
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo={
            id:id,
            label:"Instruction:\nSwitch"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //EXPRESION
        let edge={
            from:id,
            to:`${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addEdgesAst(edge)
        this.expresion.ast(id,0,nivel);
        //CASES LIST O 
        let n=1
        if(this.caselist.length!==0){
            for(let i=0; i<this.caselist.length; i++){
                //CASE
                    if(this.caselist[i] instanceof Case){
                        edge={
                            from:id,
                            to:`${id}${n}N${nivelHijo}`
                        }
                        B_datos.getInstance().addEdgesAst(edge)
                        this.caselist[i].ast(id,n,nivel);
                    }else{
                        //NODO DEFAULT
                        nodo={
                            id:`${id}${n}N${nivelHijo}`,
                            label:"Default"
                        }
                        edge={
                            from:id,
                            to:`${id}${n}N${nivelHijo}`
                        }
                        B_datos.getInstance().addNodosAst(nodo);
                        B_datos.getInstance().addEdgesAst(edge);
                        //INSTRUCCIONES DEL DEFAULT    
                        for(let x=0; x<this.caselist[i].length; x++){
                           
                            edge={
                                from:`${id}${n}N${nivelHijo}`,
                                to:`${id}${n}N${nivelHijo}`+""+x+"N"+(nivelHijo+1)
                            }
                            B_datos.getInstance().addEdgesAst(edge)
                            this.caselist[i][x].ast(`${id}${n}N${nivelHijo}`,x,nivelHijo);
                        }
                    }
                    n++;
            }
        }
    }

}