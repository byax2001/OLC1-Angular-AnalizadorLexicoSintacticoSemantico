import { Type } from "./Type";

export class Symbol{
    constructor(
        public type:Type,
        public id:string,
        public value:any,
        public line:number,
        public column:number
    ){}

}