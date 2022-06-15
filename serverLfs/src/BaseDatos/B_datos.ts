import { Environment } from "../Symbols/Environment";

export class B_datos{
    private static instance:B_datos;
    Errores:any[];
    Enviroments:any[];
    Consola:string[];
    NodosAst:any[];
    EdgesAst:any[];
    private constructor(){
        this.Errores=[]
        this.Enviroments=[]
        this.Consola=[]
        this.NodosAst=[]
        this.EdgesAst=[]
    }
    
    public static getInstance():B_datos{
        if(!B_datos.instance){
            B_datos.instance=new B_datos();
        }
        return B_datos.instance;
    }

    //AÑADIR ERROR
    addError(tipoError:string,Descripcion:String,line:number,column:number){
        this.Errores.push([this.Errores.length,tipoError,Descripcion,line,column]);
    }

    clearErrores(){
        this.Errores=[];
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
    getListEnviroments(){
        let envs:any[]=[];
        for(let env of this.Enviroments){
            let envValue:Environment=env[1];
            let variables=envValue.getVariables(); //[[variable1],[variable2],[variable3]]
            envs.push([env[0],variables]); //[id_enviroment, [variables del enviroment y sus propiedades]]
        }
        console.log(envs);
        return envs;
    }
    clearEnviroments(){
        this.Enviroments=[];
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
    clearConsola(){
        this.Consola=[];
    }
    //==========================AST==============================
    addNodosAst(Nodo:any){
        this.NodosAst.push(Nodo);
    }
    addEdgesAst(Edge:any){
        this.EdgesAst.push(Edge)
    }
    clearAst(){
        this.NodosAst=[];
        this.EdgesAst=[];
    }
    getAst():any[]{
        //RETORNA NODOS Y EDGES 
        let ast:any[]=[]
        ast.push(this.NodosAst);
        ast.push(this.EdgesAst)
        return ast; 
    }
}