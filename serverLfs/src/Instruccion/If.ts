import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Environment } from "../Symbols/Environment";

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


    public execute(env:Environment){
        let result=this.expresion.execute(env);
      /*  console.log("------------------------------------------------")
        console.log("==========================0")
        console.log(this.expresion);
        console.log("==========================0")
        console.log(this.instruction);
        console.log("==========================0")
        console.log(this.instruction2);*/
        if (result.value==true) {
            
            for (let i = 0; i < this.instruction.length; i++) {
                const res = this.instruction[i].execute(env);
               
            }
        } else {
            
            for (let i = 0; i < this.instruction2.length; i++) {
                const res = this.instruction2[i].execute(env);
            }
        }
        return null;

    }


}