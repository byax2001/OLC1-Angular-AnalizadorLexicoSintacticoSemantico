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

    public getVariables() {
        let variables:any[] = []
        let simbolo = new Symbol(false, Type.error, "", "", 0, 0);
        this.variables.forEach((value, key) => {
            simbolo = value; //OBTIENE EL ELEMENTO ACTUAL RECORRIDO DEL MAP DE VARIABLES 
            let tipo = "any"   //OBTIENE SU TIPO
            if (simbolo.type === Type.INT) {
                tipo = "int"
            } else if (simbolo.type === Type.DOUBLE) {
                tipo = "double"
            } else if (simbolo.type === Type.CHAR) {
                tipo = "char"
            } else if (simbolo.type === Type.BOOLEAN) {
                tipo = "boolean"
            } else if (simbolo.type === Type.STRING) {
                tipo = "string"
            }else if (simbolo.type === Type.VOID) {
                tipo = "void"
            }
            let constante=" "; //VERIFICA SI ES CONSTANTE O NO
            if(simbolo.constante===true){
                constante="constante"
            }else{
                constante=" "
            }
            let parametros=0
            if(simbolo.nParametros!==undefined){
                parametros=simbolo.nParametros //VERIFICA SI TIENE PARAMETROS 
            }
            let valor= value.value;
            
            if(Array.isArray(value.value)){
                valor="Instrucciones"
            }
                            //CONSTANTE,TIPO,ID,VALOR,LINEA,COLUMNA,PARAMETROS 
            variables.push([constante,tipo,value.id,valor,value.line,value.column,parametros]);//GUARDA ESTOS DATOS EN UN ARRAY DE ARRAYS
        })
        return variables;
    }

    public guardarSimbolo(constante:boolean,type:Type,id:string,value:any,linea:number,column:number){
        this.variables.set(id,new Symbol(constante,type,id,value,linea,column));
        return true 
        
    }
    public guardarSimboloMF(constante:boolean,type:Type,id:string,value:any,linea:number,column:number,nParametros?:number){
        this.variables.set(id,new Symbol(constante,type,id,value,linea,column,nParametros));
        return true 
    }
    public existeSimDeclaracion(id:string):boolean{
        return this.variables.has(id);
    }

    public existeSimbolo(id:string):boolean{
        let envActual:Environment=this;
        let existe=this.variables.has(id);
        if(existe==false){
            if(envActual.anterior==null){
                return existe;
            }else{
                envActual=envActual.anterior;
            }
            existe=envActual.existeSimbolo(id);
            if(existe==true){
                return existe;
            }
        }
        return existe;
    }
    public getSimbolo(id:string):Symbol{
        let envActual:Environment=this;
        let simbolo= new Symbol(false,Type.error,"","",0,0);
        
        envActual.variables.forEach((value,key)=>{
            if(key==id){
                simbolo=value;
            }
        })
        if(simbolo.type==Type.error){
            if(envActual.anterior==null){
                return simbolo;
            }else{
                envActual=envActual.anterior;
            }
            simbolo=envActual.getSimbolo(id);
            if(simbolo.type!=Type.error){
                return simbolo;
            }
            
        }
        return simbolo;
    }   
    public ChangeSimbolo(id:string,newValue:any):any{
        let change=false;
        let envActual:Environment=this;
        envActual.variables.forEach((value,key)=>{
            if(key===id && value.constante!=true){
                value.value=newValue
                change=true;
            }
        })
        if(change==false){
            if(envActual.anterior==null){
                return change;
            }else{
                envActual=envActual.anterior;
            }
            change=envActual.ChangeSimbolo(id,newValue);
            if(change==true){
                return change;
            }
            
        }
        return change 
    }

    public getFunMetodo(id:string,nparametros:number):Symbol{
        let envActual:Environment=this;
        let simbolo= new Symbol(false,Type.error,"","",0,0);
        this.variables.forEach((value,key)=>{
            if(key==id){
                if(value.id==id && value.nParametros==nparametros){
                    simbolo=value;
                }
            }
        })
        
        if(simbolo.type==Type.error){
            if(envActual.anterior===null){
                return simbolo;
            }else{
                envActual=envActual.anterior;
            }
            simbolo=envActual.getFunMetodo(id,nparametros);
            if(simbolo.type!==Type.error){
                return simbolo;
            }
            
        }
        return simbolo;
    }

}