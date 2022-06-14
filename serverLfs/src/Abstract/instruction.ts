import { Environment } from "../Symbols/Environment";

export abstract class instruction{
    public constructor(
        public line:number,
        public column:number
    ){
        this.line=line;
        this.column=column;
    }
    
    public abstract execute(env:Environment):any;
    public abstract ast(idPadre:string,NoHijo:number,NivelPadre:number):any;
    //AST EN EL NODO PRINCIPAL SE CREA EL NODO CON EL NOMBRE DEL PADRE+ UN NUMERO  EN CASO ARRAY O NO
    //LUEGO SE APUNTA CON ESTE NODO A SUS HIJOS (CONJUNTO DE INSTRUCCIONES)
    //A LOS NODOS LITERAL NO SE APUNTA A NADA 
}
