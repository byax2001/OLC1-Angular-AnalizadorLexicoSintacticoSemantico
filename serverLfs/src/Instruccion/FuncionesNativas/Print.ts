import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Environment } from "../../Symbols/Environment";

export class Print extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        if(this.expresion!=null){
            let exp=this.expresion.execute(env);
            console.log(">>"+exp.value);
        }else{
            console.log(">>");
        }
    }
}
