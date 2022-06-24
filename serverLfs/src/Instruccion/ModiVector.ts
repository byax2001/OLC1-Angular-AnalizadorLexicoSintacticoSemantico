import { expresion } from "../Abstract/expresion";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Retorno } from "../Abstract/Retorno";
import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";

export class ModiVector extends instruction{
    constructor(
        public id: string,
        public index: expresion,
        public index2: expresion,
        public expresion:expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let result:Retorno={value:null,type:Type.error}
        let vec=env.getSimbolo(this.id);
        let exp=this.expresion.execute(env);//VALOR A ASIGNAR A LA DIRECCION DE VECTOR INDICADA  
        //VERIFICAR QUE EXPRESION NO HAYA DADO NINGUN ERROR 

        if(exp.type!==Type.error){
            if(vec.type!==Type.error &&   typeof vec.value==="object"){
                if(this.index2!==null && this.index!==null){
                    let index=this.index.execute(env);
                    let index2=this.index2.execute(env);
                    if(index.type===Type.INT, index2.type===Type.INT){
                        let array=vec.value.value;                                        // si funciona esto v, pero se supone que cuando tiene una sola fila es un array simple por lo cual teoricamente no deberia de funcionar
                        if(index.value<vec.value.filas && index2.value<vec.value.columnas && vec.value.filas>1){
                             if(vec.type===exp.type){
                                array[index.value][index2.value]=exp
                             }else{ 
                                 //REPORTAR ERROR DISTINTO TIPOD E VALOR A ASIGNAR
                             }
                        }else{
                            //INDEX FUERA DEL TAMAÑO ESTABLECIDO 
                        }  
                    }else{
                        //EL INDEX NO ES UN INT REPORTAR 
                    }
    
                }else if(this.index!==null){
                    let index=this.index.execute(env);
                    if(index.type===Type.INT){
                        let array=vec.value.value;
                        if(index.value<vec.value.columnas){
                            if(vec.type===exp.type){
                                array[0][index.value]=exp
                             }else{ 
                                 //REPORTAR ERROR DISTINTO TIPOD E VALOR A ASIGNAR
                             }
                        }else{
                            //INDEX FUERA DEL TAMAÑO ESTABLECIDO 
                        }
                    }else{
                        //EL INDEX NO ES UN INT REPORTAR 
                    }
    
                }
               
            }else{
                //EL SIMBOLO NO EXISTE O EL VALOR NO ES UN ARRAY
            }
        }else{
            //DIO ERROR LA EXPRESION A INGRESAR 
        }

        return result
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo = nivel + 1;
        let id = `${idPadre}${NoHijo}N${nivel}`

        let nodo = {
            id: id,
            label: "Instruction:\nModificacion de Vector"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //INDEX 1
        nodo={
            id:`${id}${0}N${nivelHijo}`,
            label:"Index 1"
        }
        let edge={
            from:id,
            to:`${id}${0}N${nivelHijo}`
        }
        B_datos.getInstance().addNodosAst(nodo);
        B_datos.getInstance().addEdgesAst(edge);
        if(this.index!==null && this.index2!==null){
             //INDEX 2
            nodo={
                id:`${id}${1}N${nivelHijo}`,
                label:"Index2"
            }
            let edge={
                from:id,
                to:`${id}${1}N${nivelHijo}`
            }
            B_datos.getInstance().addNodosAst(nodo);
            B_datos.getInstance().addEdgesAst(edge);
            //INDEX 1
            edge={
                from:`${id}${0}N${nivelHijo}`,
                to:`${id}${0}N${nivelHijo}`+0+"N"+(nivelHijo+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.index.ast(`${id}${0}N${nivelHijo}`,0,nivelHijo);

            //INDEX 2
            edge={
                from:`${id}${1}N${nivelHijo}`,
                to:`${id}${1}N${nivelHijo}`+0+"N"+(nivelHijo+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.index2.ast(`${id}${1}N${nivelHijo}`,0,nivelHijo);

        }else if(this.index!==null){
            let edge={
                from:`${id}${0}N${nivelHijo}`,
                to:`${id}${0}N${nivelHijo}`+0+"N"+(nivelHijo+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
            this.index.ast(`${id}${0}N${nivelHijo}`,0,nivelHijo);
        }
        //EXPRESION
        let n=1
        if(this.index2!==null){
            n=2;
        }
        edge={
            from:id,
            to:`${id}${n}N${nivelHijo}`,
        }
        B_datos.getInstance().addEdgesAst(edge);
        this.expresion.ast(`${id}${n}N${nivelHijo}`,0,nivelHijo);
        
    }
}
