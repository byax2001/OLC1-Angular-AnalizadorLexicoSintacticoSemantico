import { Environment } from "../Symbols/Environment";

export class B_datos{
    private static instance:B_datos;
    Errores:any[];
    Enviroments:any[];
    EnviromentsEsp:any[]; //Enviroments especificos a mostrar por la funcion graficarts()
    Consola:string[];
    NodosAst:any[];
    EdgesAst:any[];
    private constructor(){
        this.Errores=[]
        this.Enviroments=[]
        this.EnviromentsEsp=[]
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
                                //nombre del enviroment y el objeto enviroment
        this.Enviroments.push([nombreEnv,env]);
    }
    //ADD ENVIROMENTS ESPECIFICADOS POR EL COMANDO GRAFICAR TS()
    addEnviromentsEsp(nombreEnv: string, env: Environment) {
        //nombre del enviroment y el objeto enviroment
        this.EnviromentsEsp.push([nombreEnv, env]);
    }

    //OBTENER LISTA DE ENVIROMENTS
    getListEnviroments(tipoEnv:number){
        let envs:any[]=[];
        let Enviroments=this.Enviroments
        //SI EL TIPO ENV ES 1 ETONCES SE ESTA PIDIENDO TODOS LOS ENVIROMENTS
        //SI ES 2 SE ESTA PIDIENDO LOS ENVIROMENTS ESPECIFICADOS POR LA FUNCION GRAFICAR TS()
        if(tipoEnv===2){
            Enviroments=this.EnviromentsEsp;
        }
        for(let env of Enviroments){
            let envValue:Environment=env[1];  //ENVIROMENT MANIPULADO ACTUALMENTE, env[0]:nombre del enviroment
            let variables=envValue.getVariables(); //[[variable1],[variable2],[variable3]]
            envs.push([env[0],variables]); //[id_enviroment, [variables del enviroment y sus propiedades]]
        }
        return envs;
    }
    clearEnviroments(){
        this.Enviroments=[];
        this.EnviromentsEsp=[];
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
        this.Consola.push("\n==Se termino de analizar la entrada de texto==")
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