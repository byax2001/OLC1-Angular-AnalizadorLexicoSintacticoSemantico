import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
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
    public execute(env:Environment){
        let error;

        let indexCase=-1;
        let indexDefault=-1;
    

        let eBreak=false;
        let expSwitch= this.expresion.execute(env);

        for(let i=0;  i<this.caselist.length ;i++){
            if(this.caselist[i] instanceof Case){
                let caseExp=this.caselist[i].rExpresion(env);
                if(caseExp.value==expSwitch.value && caseExp.type==expSwitch.type){
                    indexCase=i;
                }
            }else{
                indexDefault=i;
            }
        }

        if(indexCase==-1){ //NO HAY CASE QUE CUMPLA CON LA CONDICION
            if(indexDefault!=-1){//SI EXISTE UN DEFAULT EMPEZARA DESDE AHI LA EJECUCION DE INSTRUCCIONES
                indexCase=indexDefault
            }else{
                //REPORTAR ERROR Y MANDAR NULL, NO EXISTE NI CASE QUE CUMPLA NI ALGUN DEFAULT 
                return null; 
            }
        }

   
        for(let x=indexCase; x<this.caselist.length ;x++){
            if(this.caselist[x] instanceof Case){ //SI ES UN TIPO CASE 
                let caseJstament= this.caselist[x].execute(env);//EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                    if(caseJstament!=null){ //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                        if(caseJstament instanceof Break){
                            break;
                        }else{
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            return null;
                        }
                    }
            }else{ //SI ES EL DEFAULT 
                for(let instDefault of this.caselist[x]){
                    if(instDefault instanceof Break){
                        eBreak=true;
                        break;
                    }else if(instDefault instanceof Return || instDefault instanceof Continue ){
                        //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                        return null;
                    }else{
                        instDefault.execute(env);
                    }
                }
            }
        }
        return null  
        
    }

}