import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { B_datos } from "../BaseDatos/B_datos";
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
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;

        let nodo={
            id:id,
            label:"Instruction: Case"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //EXPRESION
        this.expresion.ast(id,0);
        let edge={
            from:id,
            to:id+""+0,
        }
        B_datos.getInstance().addEdgesAst(edge);
        //INSTRUCCIONES
        for(let i=0; i<this.instruccion.length; i++){
            let edge={
                from:id,
                to:id+""+(i+1),
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instruccion.length; i++){
            this.instruccion[i].ast(id,(i+1));
        }
    }

}