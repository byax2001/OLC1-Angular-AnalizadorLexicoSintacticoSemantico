import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { B_datos } from "../../BaseDatos/B_datos";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";


export class IndexOf extends instruction{
    constructor(
        public id: string,
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let result: Retorno = { value: null, type: Type.error }
        let vec = env.getSimbolo(this.id);
        let exp = this.expresion.execute(env);//VALOR A ASIGNAR A LA DIRECCION DE VECTOR INDICADA  
        //VERIFICAR QUE EXPRESION NO HAYA DADO NINGUN ERROR 

        if (exp.type !== Type.error) {
            if (vec.type !== Type.error && typeof vec.value === "object") {
                if(vec.value.filas===1){
                    /*
                        vector={ value: array, fila:number, columna:number}
                        vec.value=vector
                        vec.value.value=array;
                    */
                    let index=this.indexOfElement(vec.value.value[0],exp);
                    result={value:index,type:Type.INT}
                }else{
                    //REPORTAR ERROR, INTENTO DE HACER INDEX OF A ARRAY DE DOS DIMENSIONES
                    B_datos.getInstance().addError("Semantico","Intento de hacer indexOf a un vector de dos dimensiones",this.line,this.column);
                }
            }else{
                //NO ES UN VECTOR A LO QUE SE LE QUIERE HACER INDEX OF 
                B_datos.getInstance().addError("Semantico","IndexOf solo funciona en vectores de una dimension",this.line,this.column);     
            }
        }else{
            //REPORTAR ERROR OCURRIO UN ERROR EN LA EXPRESION
            B_datos.getInstance().addError("Semantico","Expresion con la que se hara IndexOf da error",this.line,this.column);
                        
        }
        return result
    }

    public indexOfElement(matriz:any[],expresion:Retorno){
        let index=-1;
        let n=0;
        for(let element of matriz){
            if(element.value===expresion.value && element.type===expresion.type){
                index=n;
                break;
            }
            n++;
        }
        return index;
    }

    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nIndexOf"
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