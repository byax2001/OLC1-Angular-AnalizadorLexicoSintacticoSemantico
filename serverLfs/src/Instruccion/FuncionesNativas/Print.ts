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
            if(typeof exp.value==="object" && exp.value.value!==null){
                //ENTONCES ES UN ARRAY
                if(exp.value.filas===1){
                    console.log(">>"+exp.value.value[0]);
                    B_datos.getInstance().printConsola(">>"+exp.value.value[0]);
                }else{
                    console.log(">>"+exp.value.value);
                    B_datos.getInstance().printConsola(">>"+exp.value.value);
                }
                
            }else{
                console.log(">>"+exp.value);
                B_datos.getInstance().printConsola(">>"+exp.value);
            }
        }else{
            console.log(">>");
            B_datos.getInstance().printConsola(">>");
        }
    }

    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nPrint"
        }
        B_datos.getInstance().addNodosAst(nodo);
        if (this.expresion !== null) {
            let edge = {
                from: id,
                to:`${id}0N${(nivel+1)}`
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 0,nivel);//NODO HIJO: EXPRESION
        }
    }
}
