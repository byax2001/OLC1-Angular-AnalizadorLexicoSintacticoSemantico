import { expresion } from "../Abstract/expresion";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import { Retorno } from "../Abstract/Retorno";
export class AccesoVector extends expresion{
    constructor(
        public id: string,
        public index: expresion,
        public index2: expresion,
        line:number,
        column:number
    ){
        super(line,column);
    }
    public execute(env:Environment){
        let result:Retorno={value:null,type:Type.error}
        let vec=env.getSimbolo(this.id);
        if(vec.type!==Type.error &&   typeof vec.value==="object"){ //QUE SI SE ENCONTRO Y QUE ES UN ARRAY
            if(this.index2!==null && this.index!==null){
                let index=this.index.execute(env);
                let index2=this.index2.execute(env);
                if(index.type===Type.INT, index2.type===Type.INT){
                    let array=vec.value.value;
                    if(index.value<vec.value.filas && index2.value<vec.value.columnas){
                        result= array[index.value][index2.value]
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
                        result= array[0][index.value]
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

        return result
    }
    public ast(){

    }
}
