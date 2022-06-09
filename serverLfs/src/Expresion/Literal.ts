import { expresion } from "../Abstract/expresion";
import { Retorno } from "../Abstract/Retorno";
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

    public execute():Retorno{
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
            result=  {value:this.value,type:Type.STRING}
        }else if(this.type==Type.CHAR){
            result=  {value:this.value,type:Type.CHAR}
        }else{
            result={value: this.value, type: Type.error}
        }
        
        return result
    }
}   