import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";

export class Println extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        if(this.expresion!==null){
            let exp=this.expresion.execute(env);
            console.log(">>"+exp.value+"\n");
            B_datos.getInstance().printlnConsola(">>"+exp.value+"\n");
        }else{
            console.log(">>\n");
            B_datos.getInstance().printlnConsola(">>\n");
        }
    }
}