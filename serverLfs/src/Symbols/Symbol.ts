import { Type } from "./Type";

export class Symbol{
    constructor(
        public constante:boolean,
        public type:Type,
        public id:string,
        public value:any,
        public line:number,
        public column:number
    ){}

}