import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class Case extends instruction{
    constructor(
        public expresion:expresion,
        public instruccion:instruction[],
        line:number,
        column:number
    ){
        super(line,column)
    }
    public execute(env:Environment){
        let jumpStament=null; //SALTOS DE CODIGO break,return,continue si no hay ninguno de estos se retornara null
        for(let Instruction of this.instruccion){
            //La instruccion es alguna de estas?
            if(Instruction instanceof Break || Instruction instanceof Return || Instruction instanceof Continue){
                //si es asi asignar dicha clase a la variable y retornarla 
                jumpStament=Instruction;
                break;
            }
            //SI NO ES ALGUN SALTO DE CODIGO EJECUTAR
            Instruction.execute(env);
        }
        return jumpStament
    }
    public rExpresion(env:Environment):Retorno{
        let expresion=this.expresion.execute(env);
        return expresion;
    }
    public ast(){
        
    }

}