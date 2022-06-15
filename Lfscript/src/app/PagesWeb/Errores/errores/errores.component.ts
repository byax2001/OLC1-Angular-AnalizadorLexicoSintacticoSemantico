import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {
  cabecera=["No.","Type Error","Description","Line","Column"];
  TableVisibility=true;
  errores=[];
  constructor(
    private ClientS:ClientService
  ) { }

  ngOnInit(): void {
  }

  graficarTabla() {
    this.ClientS.getTError().subscribe(
      (res) => {
        let respuesta: any = []
        Object.entries(res).forEach(item => {
          respuesta.push(item[0], item[1]);
        });
        this.errores = respuesta[1];
      },
      (err) => {
        console.log(err);
      }
    )
    

  }

}
