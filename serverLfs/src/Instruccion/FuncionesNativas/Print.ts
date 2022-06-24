import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

export class Print extends instruction{
    constructor(
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        if (this.expresion !== null) {
            let exp = this.expresion.execute(env);
            if (typeof exp.value === "object" && exp.value.value !== null) {
                //ENTONCES ES UN ARRAY
                let stringVector=this.printVector(exp.value.value);
                console.log(">>" + stringVector);
                B_datos.getInstance().printConsola(">>" + stringVector);
            } else {
                console.log(">>" + exp.value);
                B_datos.getInstance().printConsola(">>" + exp.value);
            }
        } else {
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

    printVector(vector:any[]){
        let stringVector="["
        if(vector.length===1){
            //VECTOR DE UNA DIMENSION
            vector=vector[0];
            for(let element of vector){
                stringVector=stringVector+this.eValueType(element.value,element.type)+","
            }
            stringVector=stringVector.slice(0,stringVector.length-1);//ELIMINAR ULTIMA COMA
            stringVector=stringVector+"]"
        }else{
            for(let fila of vector){
                let stringFila="["
                for(let element of fila){
                    stringFila=stringFila+this.eValueType(element.value,element.type)+","
                }
                stringFila=stringFila.slice(0,stringFila.length-1); //ELIMINAR ULTIMA COMA
                stringFila=stringFila+"]"

                stringVector=stringVector+stringFila+","
            }
            stringVector=stringVector.slice(0,stringVector.length-1);//ELIMINAR ULTIMA COMA
            stringVector=stringVector+"]"
        }

        return stringVector
    }
    //RETORNA UN STRING CON LOS CARACTERES QUE DEBERIAN DE ACOMPAÑAR CADA TIPO
    eValueType(dato:any,type:Type){
        if(type===Type.STRING){
            dato=`\"${dato}\"`
        }else if(type===Type.CHAR){
            dato=`\'${dato}\'`
        }
        return dato
    }
}
