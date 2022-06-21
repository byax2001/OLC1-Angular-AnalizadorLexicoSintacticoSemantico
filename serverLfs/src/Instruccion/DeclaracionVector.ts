import { expresion } from "../Abstract/expresion";
import { instruction } from "../Abstract/instruction";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbols/Environment";
import { Type } from "../Symbols/Type";
import {Vector} from "../Abstract/Vector";

export class DeclaracionVector extends instruction{
    constructor(
        public tipo:Type,
        public id: string,
        public tipoDecVec:number, //DECLARCACION TIPO 1 O TIPO2
        //DECLARACION VECTOR TIPO 1
        public tipo2:Type, // = new tipo[nFilas][nColumnas]
        public nFilas:expresion,  
        public nColumnas:expresion,
        //DECLARACION VECTOR TIPO 2
        public vector: any[],
        public nfilasT2: number,//PARA DIFERENCIAR UN VECTOR TIPO [] Y UNO [][] SI HAY MAS DE 1 FILA EL VECTOR DEJA DE SER []
        line:number,
        column:number
    ){
        super(line,column);
    }

    public execute(env:Environment){
        if(this.tipoDecVec===1){
            if(this.tipo===this.tipo2){
                let existe= env.existeSimDeclaracion(this.id)
                if(existe){
                    //REPORTAR ERROR VARIABLE YA DECLARADA 
                }else{
                    if(this.nFilas!==null && this.nColumnas!==null){
                        let nfilas=this.nFilas.execute(env);
                        let ncolumnas=this.nColumnas.execute(env);
                        if(nfilas.type===Type.INT && ncolumnas.type===Type.INT){
                            let matriz=[];
                            let fila=[];
                            let def=this.valorDefault(this.tipo);
                            for(let j=0; j<nfilas.value; j++){
                                fila=[];
                                for(let i=0; i<ncolumnas.value; i++){
                                    fila.push(def);
                                }
                                matriz.push(fila);
                            }
                            let vec:Vector={value:matriz,filas:nfilas.value,columnas:ncolumnas.value}
                            env.guardarSimbolo(true,this.tipo,this.id,vec,this.line,this.column);
                        }else{
                            //REPORTAR ERROR DEBEN DE SER ENTEROS LOS DATOS DE ACA
                        }
                    

                    } else if (this.nColumnas !== null) {

                        let ncolumnas = this.nColumnas.execute(env);
                        if (ncolumnas.type === Type.INT) {
                            let matriz = [];
                            let fila = [];
                            let def = this.valorDefault(this.tipo);
                            for (let i = 0; i < ncolumnas.value; i++) {
                                fila.push(def);
                            }
                            matriz.push(fila);
                            let vec:Vector={value:matriz,filas:1,columnas:ncolumnas.value} //MATRIZ, FILAS,COLUMNAS
                            console.log(vec.value);
                            env.guardarSimbolo(true,this.tipo,this.id,vec,this.line,this.column);
                        } else {
                            //REPORTAR ERROR DEBEN DE SER ENTEROS LOS DATOS DE ACA
                        }

                    } else {
                        //REPORTAR ERROR NO SE MANDARON NI FILAS NI COLUMNAS 
                    }
                }
            }else{  
                //REPORTAR ERROR NO SON DEL MISMO TIPO EL ARRAY
            }
        } else if (this.tipoDecVec === 2) {
            if ((this.vector.length === this.nfilasT2) || (this.vector.length > 1 && this.nfilasT2 > 1)) {
                let existe = env.existeSimDeclaracion(this.id)
                if (existe) {
                    //REPORTAR ERROR VARIABLE YA DECLARADA 
                } else {
                    let matriz = [];
                    let fila = [];
                    let nfilas = this.vector.length;
                    let ncolumnas = this.vector[0].length;
                    let error: number = 0;
                    console.log(this.vector);
                    for (let line of this.vector) {
                        if (line.length !== ncolumnas) {
                            //REPORTAR ERROR HAY UNA FILA A LA QUE LE FALTAN DATOS 
                            return null
                        }
                        fila = [];
                        for (let element of line) {
                            console.log(element);
                            let exp = element.execute(env);
                            if (exp.type === this.tipo) {
                                //SE INGRESA VALOR A LA FILA ACTUAL 
                                fila.push(exp);
                            } else {
                                error = 1;
                                break;
                            }
                        }
                        if (error !== 0) {
                            //REPORTAR ERROR HAY EXPRESIONES QUE NO SON IGUALES AL TIPO DE DATO DEL ARRAY
                            return null
                        }
                        matriz.push(fila); //INGRESO DE FILA A LA MATRIZ 
                    }
                    let vec: Vector = { value: matriz, filas: nfilas, columnas: ncolumnas } //MATRIZ, FILAS,COLUMNAS
                    console.log(vec)
                    env.guardarSimbolo(false, this.tipo, this.id, vec, this.line, this.column);
                }
            }
        } else {
            //REPORTAR ERROR TAMAÑOS DE FILAS Y [][] NO CUADRAN 
        }

    }
    public ast(){

    }

    public valorDefault(type:Type){
        let def:Retorno={value:null, type:Type.error};
        if(type===Type.INT){
            def={value:0,type:Type.INT}
        }else if(type===Type.DOUBLE){
            def={value:0.0,type:Type.DOUBLE}
        }else if(type===Type.CHAR){
            def={value:"\u0000",type:Type.CHAR}
        }else if(type===Type.BOOLEAN){
            def={value:false,type:Type.BOOLEAN}
        }else if(type===Type.STRING){
            def={value:"",type:Type.STRING}
        }
        return def 
    }
}