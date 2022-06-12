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
        for(let Instruccion of this.instrucciones){
            try{
                Instruccion.execute(env);
            }
            catch(e){
                console.log(e)
                B_datos.getInstance().addError("Semantico","Instruccion fallida en bloque de instrucciones",this.line,this.column)
            }
            
        }
    }
}