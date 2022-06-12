import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

export class While extends instruction  {
    constructor(
        public expresion:expresion,
        public bloqueInst:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let exp;
        do{
            exp=this.expresion.execute(env);
            if(exp.value==true){
                for(let i=0; i<this.bloqueInst.length;i++){
                    this.bloqueInst[i].execute(env);
                }
            }
        }while (exp.value) 
        return null;
    }
}