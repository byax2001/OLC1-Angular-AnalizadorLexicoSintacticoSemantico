import { Symbol } from "./Symbol";

export class Enviroment{
    private variables:Map<string,Symbol>
    constructor(){
        this.variables=new Map();
    }
}