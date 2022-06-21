import { expresion } from "../../Abstract/expresion";
import { instruction } from "../../Abstract/instruction";
import { Retorno } from "../../Abstract/Retorno";
import { Environment } from "../../Symbols/Environment";
import { Type } from "../../Symbols/Type";

7
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
                }
            }else{
                //NO ES UN VECTOR A LO QUE SE LE QUIERE HACER INDEX OF 
            }
        }else{
            //REPORTAR ERROR OCURRIO UN ERROR EN LA EXPRESION
        }
        return result
    }
    public ast(){

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
}