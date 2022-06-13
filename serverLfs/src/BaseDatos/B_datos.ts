import { Environment } from "../Symbols/Environment";

export class B_datos{
    private static instance:B_datos;
    Errores:any[];
    Enviroments:any[];
    Consola:string[];
    private constructor(){
        this.Errores=[]
        this.Enviroments=[]
        this.Consola=[]
    }
    
    public static getInstance():B_datos{
        if(!B_datos.instance){
            B_datos.instance=new B_datos();
        }
        return B_datos.instance;
    }

    //AÑADIR ERROR
    addError(tipoError:string,Descripcion:String,line:number,column:number){
        let error={
            typeError:tipoError,
            Decription:Descripcion,
            linea:line,
            columna:column
        }
        this.Errores.push(error)
    }
    //Retornar lista de errores
    getListError():any[]{
        return this.Errores
    }
    //ADD ENVIROMENTS

    addEnviroments(nombreEnv:string,env:Environment){
        this.Enviroments.push([nombreEnv,env]);
    }

    //OBTENER LISTA DE ENVIROMENTS
    getListEnviroments():Environment[]{
        return this.Enviroments;
    }
    //PRINT CONSOLA
    printConsola(print:string){
        if(this.Consola.length!==0){
            this.Consola[this.Consola.length-1]=this.Consola[this.Consola.length-1]+" "+print;
        }else{
            this.Consola.push(print);
        }
    }
    //PRINTLN CONSOLA
    printlnConsola(print:string){
        this.Consola.push(print);
    }
    //GET CONSOLA
    getConsola():string[]{
        return this.Consola;
    }
}