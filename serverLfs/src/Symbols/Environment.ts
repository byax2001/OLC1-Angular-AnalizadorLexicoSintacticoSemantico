import { Symbol } from "./Symbol";
import { Type } from "./Type";

export class Environment{
    private variables:Map<string,Symbol>
    //ANTERIOR ES UN PUNTERO PARA CREAR UNA LISTA ENLAZADA 
    constructor(
        public anterior: Environment|null
    ){
        this.variables=new Map();
    }
    

    public guardarSimbolo(constante:boolean,type:Type,id:string,value:any,linea:number,column:number){
        this.variables.set(id,new Symbol(constante,type,id,value,linea,column));
        return true 
        
    }
    public guardarSimboloMF(constante:boolean,type:Type,id:string,value:any,linea:number,column:number,nParametros?:number){
        this.variables.set(id,new Symbol(constante,type,id,value,linea,column,nParametros));
        return true 
    }
    public existeSimbolo(id:string):boolean{
        let existe=this.variables.has(id)
        return existe;
    }
    public getSimbolo(id:string):Symbol{
        let simbolo= new Symbol(false,Type.error,"","",0,0);
        this.variables.forEach((value,key)=>{
            if(key==id){
                simbolo=value;
            }
        })
        return simbolo;
    }   
    public ChangeSimbolo(id:string,newValue:any){
        this.variables.forEach((value,key)=>{
            if(key==id){
                value.value=newValue
            }
        })
    }

}