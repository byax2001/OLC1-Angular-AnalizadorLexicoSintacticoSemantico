import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MJsExternosService } from './../../m-js-externos.service'
import { ClientService } from '../../services/client.service'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  @ViewChild('AreaPest') APest: ElementRef;
  @ViewChild('contPest') Cpest: ElementRef;
  @ViewChild('p1') p1: ElementRef; //pestaña1
  @ViewChild('p2') p2: ElementRef;
  @ViewChild('p3') p3: ElementRef;
  @ViewChild('p4') p4: ElementRef;
  @ViewChild('p5') p5: ElementRef;
  file = "";
  nameSaveF = "";
  TextConsola = "";
  tTextArea1 = "";
  tTextArea2 = "";
  tTextArea3 = "";
  tTextArea4 = "";
  tTextArea5 = "";
  Npestañas: number;
  indexPActual: number;
  constructor(
    private MjsExt: MJsExternosService,
    private clientS: ClientService,
    private Renderer2: Renderer2
  ) {
    this.MjsExt.CargarJs(['metodos.js']); //PARA CARGAR ARCHIVOS JAVASCRIPT EXTERNOS
  }
  //INICIO
  ngOnInit(): void {
    this.Npestañas = 1;
    this.indexPActual = 0;
  }
  //===========================================ARCHIVO=====================================
  //AÑADIR PESTAÑAS AL PANEL
  addTab() {
    if (this.Npestañas != 5) {
      let pest1 = this.p1.nativeElement;
      let pest2 = this.p2.nativeElement;
      let pest3 = this.p3.nativeElement;
      let pest4 = this.p4.nativeElement;
      let pest5 = this.p5.nativeElement;
      if (this.Npestañas == 1) {
        this.Renderer2.setStyle(pest2, 'visibility', 'visible');
      } else if (this.Npestañas == 2) {
        this.Renderer2.setStyle(pest3, 'visibility', 'visible');
      } else if (this.Npestañas == 3) {
        this.Renderer2.setStyle(pest4, 'visibility', 'visible');
      } else if (this.Npestañas == 4) {
        this.Renderer2.setStyle(pest5, 'visibility', 'visible');
      }
      console.log(this.indexPActual)
      this.Npestañas++;
    } else {
      alert('No se puede crear mas de 5 pestañas');
    }
  }
  //ACTUALIZAR LA POSICION ACTUAL DEL CLIENTE EN LAS PESTAÑAS
  updateIndex(iActual: number) {
    this.indexPActual = iActual;
  }
  //CARGAR UN DOCUMENTO
  cargarDocument(documento: any): void {
    this.MjsExt.getDocumento(documento).then(contenido => {
      this.setTextArea(contenido);
    })
    this.nameSaveF = this.file;
    this.file = "";
  }
  //ENVIAR EL STRING CARGADO A ALGUNO DE LOS 5 TEXTAREA
  setTextArea(Text: string) {
    let element;
    if (this.indexPActual == 0) {
      this.tTextArea1 = Text;
    } else if (this.indexPActual == 1) {
      this.tTextArea2 = Text;
    } else if (this.indexPActual == 2) {
      this.tTextArea3 = Text;
    } else if (this.indexPActual == 3) {
      this.tTextArea4 = Text;
    } else if (this.indexPActual == 4) {
      this.tTextArea5 = Text;
    }

  }
  //OPCION PARA GUARDAR 
  save() {
    let lindex = this.nameSaveF.indexOf("path") + 5;
    let blob = new Blob([this.tTextArea1], { type: 'text/plain' });;
    this.nameSaveF = this.nameSaveF.substring(lindex, this.nameSaveF.length).toString();
    if (this.indexPActual == 0) {
      blob = new Blob([this.tTextArea1], { type: 'text/plain' });
    } else if (this.indexPActual == 1) {
      blob = new Blob([this.tTextArea2], { type: 'text/plain' });
    } else if (this.indexPActual == 2) {
      blob = new Blob([this.tTextArea3], { type: 'text/plain' });
    } else if (this.indexPActual == 3) {
      blob = new Blob([this.tTextArea4], { type: 'text/plain' });
    } else if (this.indexPActual == 4) {
      blob = new Blob([this.tTextArea5], { type: 'text/plain' });
    }

    saveAs(blob, this.nameSaveF);
  }
  //OPCION PARA GUARDAR COMO
  saveAs() {
    let nameSave = prompt("Nombre del nuevo Archivo");
    if (nameSave != "" && nameSave != null) {
      let blob = new Blob([this.tTextArea1], { type: 'text/plain' });;
      if (this.indexPActual == 0) {
        blob = new Blob([this.tTextArea1], { type: 'text/plain' });
      } else if (this.indexPActual == 1) {
        blob = new Blob([this.tTextArea2], { type: 'text/plain' });
      } else if (this.indexPActual == 2) {
        blob = new Blob([this.tTextArea3], { type: 'text/plain' });
      } else if (this.indexPActual == 3) {
        blob = new Blob([this.tTextArea4], { type: 'text/plain' });
      } else if (this.indexPActual == 4) {
        blob = new Blob([this.tTextArea5], { type: 'text/plain' });
      }
      saveAs(blob, nameSave);
    }
  }
  //==========================================EJECUTAR=====================================
  analizarEntrada() {
    let textAst = this.TextAnalizar(); //SE PROCEDE A OBTENER EL STRING DE LA VENTANA ABIERTA
    this.TextConsola="";
    this.clientS.setDataTAst({ textoAst: textAst }).subscribe( //SE MANDA AL SERVICIO EN FORMA DE JSON EL STRING ENCERRADO EN UNA ETIQUETA TEXTOAST
      (res) => {
        console.log("Fue realizado con exito")
        //SE RECIBE LA RESPUESTA
        let respuesta: any[] = [];
        Object.entries(res).forEach(item => {
          respuesta.push(item[0], item[1]);
        });
        //APARTADO PARA LA CONSOLA 
        let Consola = respuesta[1];
        let ast=respuesta[3];
        this.clientS.setAst(ast);
        console.log(respuesta);
        for (let line of Consola) {
          this.TextConsola = this.TextConsola + line;
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }
  TextAnalizar() {
    let textAst = "";
    if (this.indexPActual == 0) {
      textAst = this.tTextArea1;
    } else if (this.indexPActual == 1) {
      textAst = this.tTextArea2;
    } else if (this.indexPActual == 2) {
      textAst = this.tTextArea3;
    } else if (this.indexPActual == 3) {
      textAst = this.tTextArea4;
    } else if (this.indexPActual == 4) {
      textAst = this.tTextArea5;
    }
    return textAst;
  }

  //MODELO PARA PEDIR Y RECIBIR INFORMACION ==================================================================
  getData() {
    this.clientS.getData().subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )

  }
  setData() {
    var json = { dato: 30 }
    this.clientS.setData(json).subscribe(
      (res) => {
        console.log("Fue realizado con exito")

      },
      (err) => {
        console.log(err)
      }
    )
  }
}
