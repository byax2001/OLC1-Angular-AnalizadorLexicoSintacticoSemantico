import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroment.component.html',
  styleUrls: ['./enviroment.component.css']
})
export class EnviromentComponent implements OnInit {
  cabecera=["No.","Environment","Constante","Tipo","Id","Valor","Linea","Columna","Parametros"];
  Tablevisibility=true;
  enviroments:any=[]
  constructor(
    private ClientS:ClientService
  ) { }

  ngOnInit(): void {
  }

  graficarTabla() {
    this.enviroments=[];//SE RESETEA LA TABLA DE SIMBOLOS 
    this.ClientS.getTEnvs().subscribe(
      (res) => {
        let respuesta: any = []
        Object.entries(res).forEach(item => {
          respuesta.push(item[0], item[1]);
        });
        let n=0//dontador para el numero de variables
        //enviroment,constante,tipo,id,value,line,column,parametros);
        let resp=respuesta[1];
        for(let i of resp){ //CADA ENVIROMENT
          for(let x of i[1]){ //CADA VARIABLE DE ENVIROMENT
            let aux=[n,i[0]]; //NUMERO DE VARIABLE Y NOMBRE DEL ENVIROMENT
            this.enviroments.push(aux.concat(x));
            n++;
          }
          
        }
        
      },
      (err) => {
        console.log(err);
      }
    )
  }
  graficarTablaTs() {
    this.enviroments=[];//SE RESETEA LA TABLA DE SIMBOLOS 
    this.ClientS.getTEnvsEsp().subscribe(
      (res) => {
        let respuesta: any = []
        Object.entries(res).forEach(item => {
          respuesta.push(item[0], item[1]);
        });
        let n=0//dontador para el numero de variables
        //enviroment,constante,tipo,id,value,line,column,parametros);
        let resp=respuesta[1];
        for(let i of resp){ //CADA ENVIROMENT
          for(let x of i[1]){ //CADA VARIABLE DE ENVIROMENT
            let aux=[n,i[0]]; //NUMERO DE VARIABLE Y NOMBRE DEL ENVIROMENT
            this.enviroments.push(aux.concat(x));
            n++;
          }
          
        }
        
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
