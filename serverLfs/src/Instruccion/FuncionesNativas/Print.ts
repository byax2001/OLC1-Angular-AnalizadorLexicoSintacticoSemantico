import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { B_datos } from "../../BaseDatos/B_datos";
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
        if(this.expresion!==null){
            let exp=this.expresion.execute(env);
            console.log(">>"+exp.value);
            B_datos.getInstance().printConsola(">>"+exp.value);
        }else{
            console.log(">>");
            B_datos.getInstance().printConsola(">>");
        }
    }

    public ast(idPadre: string, NoHijo: number) {
        let id = idPadre + "" + NoHijo;
        let nodo = {
            id: id,
            label: "Instruction:\nPrint"
        }
        B_datos.getInstance().addNodosAst(nodo);
        if (this.expresion !== null) {
            let edge = {
                from: id,
                to: id + "" + 0,
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 0);//NODO HIJO: EXPRESION
        }
    }
}
