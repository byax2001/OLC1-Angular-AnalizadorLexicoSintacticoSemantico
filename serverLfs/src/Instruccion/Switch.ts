import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";
import { Break } from "./Break";
import { Case } from "./Case";

export class Switch extends instruction{
    constructor(
        public expresion:expresion,
        public caselist:Case[],
        public Default: instruction[],
        public caselist2:Case[],
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let error;
        let caseExiste=false;
        let eBreak=false;
        let expSwitch= this.expresion.execute(env);

        
        if(this.caselist!=null){//SI SI EXISTEN CASE LIST ARRIBA DE DEFAULT 
            for(let CaseE of this.caselist){
                if(!caseExiste){
                    let caseExp=CaseE.rExpresion(env);
                    if(caseExp.value==expSwitch.value && caseExp.type==expSwitch.type){
                        //SI EL CASE TENIA ALGUN BREAK RETORNARA TRUE SI NO, RETORNARA FALSE 
                        caseExiste=true;
                        let caseJstament= CaseE.execute(env);//EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                        if(caseJstament!=null){ //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                            if(caseJstament instanceof Break){
                                eBreak=true;
                                break;
                            }else{
                                //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                                break;
                            }
                        }
    
                    }
                }else{
                    let caseJstament= CaseE.execute(env); //EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                    if(caseJstament!=null){ //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                        if(caseJstament instanceof Break){
                            eBreak=true;
                            break;
                        }else{
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            break;
                        }
                    }
                }
            }
        }

        if(this.Default!=null){
            if(eBreak==false){
                for(let instDefault of this.Default){
                    instDefault.execute(env);
                }
            }
        }

        
        error=false;
        caseExiste=false;
        eBreak=false;
        for(let CaseE of this.caselist2){
            if(!caseExiste){
                let caseExp=CaseE.rExpresion(env);
                if(caseExp.value==expSwitch.value && caseExp.type==expSwitch.type){
                    //SI EL CASE TENIA ALGUN BREAK RETORNARA TRUE SI NO, RETORNARA FALSE 
                    caseExiste=true;
                    let caseJstament= CaseE.execute(env);//EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                    if(caseJstament!=null){ //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                        if(caseJstament instanceof Break){
                            break;
                        }else{
                            //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                            break;
                        }
                    }

                }
            }else{
                let caseJstament= CaseE.execute(env); //EJECUTARA TODAS LAS INSTRUCCIONES DE ESTA CASE
                if(caseJstament!=null){ //SI NO RETURNA UN NULL ES QUE HABIA UN SALTO DE SENTENCIA
                    if(caseJstament instanceof Break){
                        break;
                    }else{
                        //REPORTAR ERROR VINO UN CONTINUE O UN RETURN 
                        break;
                    }
                }
            }
        }
        return null  
    }

}