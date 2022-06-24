import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

export class ToCharArray extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let matriz=[]
        let fila=[]
        let result:Retorno={value:null,type:Type.error};
        let exp=this.expresion.execute(env);
        if(exp.type!==null && exp.type===Type.STRING){
            for(let letra of exp.value){
                result={value:letra,type:Type.CHAR}
                fila.push(result);
            }
            matriz.push(fila)
        }else{
            //reportar error

        }
        //SI MATRIZ ES TAMAÑO 0 ENTONCES UN ERROR AL PASAR EL STRING A ARRAY, TOMAR ESTO EN CUENTA A LA HORA DE DECLARAR UN VECTOR 
        return matriz
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\ntoCharArray"
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
