import { instruction } from "../Abstract/instruction";
import { B_datos } from "../BaseDatos/B_datos";
import { Environment } from "../Symbols/Environment";

export class BloqueInstSup extends instruction{
    constructor(
        public instrucciones:instruction[],
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        let newEnviromet= new Environment(env);
        for(let Instruccion of this.instrucciones){
            
            try{
                Instruccion.execute(newEnviromet);
            }
            catch(e){
                console.log(e)
                B_datos.getInstance().addError("Semantico","Instruccion fallida en bloque de instrucciones",this.line,this.column)
            }
        }
        B_datos.getInstance().addEnviroments("Bloque Instrucciones",newEnviromet)
    }
    public ast(idPadre:string,NoHijo:number){
        let id=idPadre+""+NoHijo;
        let nodo={
            id:id,
            label:"Instruction: Bloque Instruccion"
        }
        B_datos.getInstance().addNodosAst(nodo);
        //EDGES CON INSTRUCCIONES
        for(let i=0; i<this.instrucciones.length; i++){
            let edge={
                from:id,
                to:id+""+i,
            }
            B_datos.getInstance().addEdgesAst(edge);
        }
        //NODOS INSTRUCCIONES
        for(let i=0; i<this.instrucciones.length; i++){
            this.instrucciones[i].ast(id,i);
        }

    }
}