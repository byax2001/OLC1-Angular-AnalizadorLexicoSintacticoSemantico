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
            //PARA SABER SI EXISTE ALGUN CASE ENTRE EL CONJUNTO DE INSTRUCCIONES
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
            for (let x = indexCase; x < this.caselist.length; x++) {
                let newEnv= new Environment(env); //Nuevo Enviroment
                if (this.caselist[x] instanceof Case) { //SI ES UN TIPO CASE 
                    let caseJstament = this.caselist[x].execute(newEnv);//EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                    if (caseJstament != null) { //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                        if (caseJstament instanceof Break) {
                            break;
                        } else {
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            B_datos.getInstance().addError("Semantico","Salto de sentencia incorrecto para el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
                            B_datos.getInstance().addEnviroments("Switch",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
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
                            B_datos.getInstance().addEnviroments("Switch",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                            return null;
                        } else {
                            instDefault.execute(newEnv);
                        }
                    }
                    B_datos.getInstance().addEnviroments("Switch",newEnv);//SE ADIRIO EL NUEVO ENVIROMENT A LA LISTA DE ENVIROMENTS
                }
            }
        }else{
            //EXPRESION GENERA ERROR EN EL SWITCH 
            B_datos.getInstance().addError("Semantico","Expresion genera un error en el switch",this.line,this.column);//SE AGREGAN LOS ERRORES A LA BASE DE DATOS
        }
        return null;
    }

}