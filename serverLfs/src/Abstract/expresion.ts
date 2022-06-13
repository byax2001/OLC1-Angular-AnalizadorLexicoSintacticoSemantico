import { Environment } from "../Symbols/Environment";
import { Retorno } from "./Retorno";

export abstract class  expresion {
    constructor(public line:number,public column:number) {
        this.line=line;
        this.column=column;
    }

    public abstract execute(enviroment:Environment):Retorno
    public abstract ast(idPadre:string,NoHijo:number):any;

}