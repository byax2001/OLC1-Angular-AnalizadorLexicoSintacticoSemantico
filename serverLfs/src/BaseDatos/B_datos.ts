import { Environment } from "../Symbols/Environment";

export class B_datos{
    private static instance:B_datos;
    Errores:any[];
    Enviroments:Environment[];

    private constructor(){
        this.Errores=[]
        this.Enviroments=[]
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

    addEnviroments(env:Environment){
        this.Enviroments.push(env);
    }

    //OBTENER LISTA DE ENVIROMENTS
    getListEnviroments():Environment[]{
        return this.Enviroments;
    }
}