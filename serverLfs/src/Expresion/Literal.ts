import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";

export class Literal extends expresion {
    constructor(
        private value:any,
        private type: Type,
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Environment):Retorno{
        let result:Retorno={value:null,type:Type.error};
        if(this.type==Type.INT){
            result=  {value:Number(this.value),type:Type.INT}
        }else if(this.type==Type.DOUBLE){
            result=  {value:Number(this.value),type:Type.DOUBLE}
        }else if(this.type==Type.BOOLEAN){
            if(this.value=="true"){
                result=  {value:Boolean(true),type:Type.BOOLEAN}
            }else if(this.value=="false"){
                result=  {value:Boolean(false),type:Type.BOOLEAN}
            }      
        }else if(this.type==Type.STRING){
            let rstring= this.LimpiarString(this.value);
            result=  {value:rstring,type:Type.STRING}
        }else if(this.type==Type.CHAR){
            let rstring= this.LimpiarString(this.value);
            result=  {value:rstring.charCodeAt(0),type:Type.CHAR}
        }else if(this.type==Type.ID){
            let existe=env.existeSimbolo(this.value)
            if(existe==true){
                let simbolo=env.getSimbolo(this.value);
                //SI EL VALOR DE SIMBOLO ES NULO SIGNIFICA QUE NO HA SIDO INICIALIZADA CON ANTERIORIDAD, POR LO TANTO NO POSEE NINGUN VALOR
                if(simbolo.value!=null){
                    result={value:simbolo.value,type:simbolo.type}
                }else{
                    result={value:null,type:Type.error};
                }
            }else{
                result={value:null,type:Type.error};
                B_datos.getInstance().addError("Semantico","No existe variable",this.line,this.column);
            }
        }else{
            B_datos.getInstance().addError("Semantico","Literal con tipo desconocido",this.line,this.column);
            result={value: this.value, type: Type.error}
        }
        
        return result
    }

    public LimpiarString(cadenat:string):string{
        cadenat=cadenat.slice(1,cadenat.length-1); //QUITAR COMILLAS A LOS CHAR Y STRING 
        cadenat=cadenat.replace("\\\"","\"");
        cadenat=cadenat.replace("\\\\","\\");
        cadenat=cadenat.replace("\\n","\n");
        cadenat=cadenat.replace("\\r","\r");
        cadenat=cadenat.replace("\\t","\t");
        cadenat=cadenat.replace("\\\'","\'");
        return cadenat
    }
    public ast(idPadre: string, NoHijo: number,NivelPadre:number) {
        let nivel= NivelPadre+1; //NIVEL NODO ACTUAL
        let nivelHijo=nivel+1;
        let id = `${idPadre}${NoHijo}N${nivel}`
        let nodo={
            id:id,
            label:`Literal:\n ${this.value}`
        }
        B_datos.getInstance().addNodosAst(nodo);
    }
}   