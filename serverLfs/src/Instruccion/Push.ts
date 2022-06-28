import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Push extends instruction{
    constructor(
        public id: string,
        public expresion: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env: Environment) {
        let result: Retorno = { value: false, type: Type.BOOLEAN }
        let vec = env.getSimbolo(this.id);
        let exp = this.expresion.execute(env);//VALOR A ASIGNAR A LA DIRECCION DE VECTOR INDICADA  
        //VERIFICAR QUE EXPRESION NO HAYA DADO NINGUN ERROR 
        if (exp.type !== Type.error) {
            if (vec.type !== Type.error && typeof vec.value === "object") {
                if (vec.value.filas === 1) {
                    if(vec.type===exp.type){
                        vec.value.value[0].push(exp);
                        vec.value.columnas=vec.value.value[0].length; //SE AGREGO UN ELEMENTO, MODIFICAR NUMERO DE COLUMNAS
                        result = { value: true, type: Type.BOOLEAN }
                    }else{
                        //REPORTAR ERROR 
                        B_datos.getInstance().addError("Semantico","Intento de ingresar un dato de tipo distinto al del vector",this.line,this.column);
                    }
                    
                }else{  
                    //INTENTO DE HACER PUSH A UN ARRAY DE DOS DIMENSIONES
                    B_datos.getInstance().addError("Semantico","Intento de hacer push a un vector de dos dimensiones",this.line,this.column);
                }
            }else{
                //NO HAY SIMBOLO CON ESA ID O NO ES UN ARRAY
                B_datos.getInstance().addError("Semantico","Variable a la que se desea acceder no es un vector o da error",this.line,this.column);
            }
        }else{
            //REPORTAR ERROR 
            B_datos.getInstance().addError("Semantico","Expresio que se desea ingresar da error",this.line,this.column);
        }
        return result;
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo = {
            id: id,
            label: "Instruction:\nPush"
        }
        B_datos.getInstance().addNodosAst(nodo);

        nodo = {
            id: `${id}0N${(nivel+1)}`,
            label:`Vector: ${this.id}`
        }
        let edge = {
            from: id,
            to:`${id}0N${(nivel+1)}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        if (this.expresion !== null) {
            edge = {
                from: id,
                to:`${id}1N${(nivel+1)}`
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.expresion.ast(id, 1,nivel);//NODO HIJO: EXPRESION
        }
    }
}