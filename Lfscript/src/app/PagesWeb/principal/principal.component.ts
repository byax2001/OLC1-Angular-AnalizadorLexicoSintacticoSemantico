import { Component, OnInit,ElementRef,ViewChild,Renderer2} from '@angular/core';
import {MJsExternosService} from './../../m-js-externos.service'
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
    file="";
    nameSaveF="";
    tTextArea1="";
    tTextArea2="";
    tTextArea3="";
    tTextArea4="";
    tTextArea5="";
    Npestañas:number;
    indexPActual:number;
  constructor(
    private MjsExt:MJsExternosService,
    private Renderer2: Renderer2
  ) { 
    this.MjsExt.CargarJs(['metodos.js']);
  }

  ngOnInit(): void {
    this.Npestañas=1;
    this.indexPActual=0;
  }

  addTab(){
    if(this.Npestañas!=5){
      let pest1=this.p1.nativeElement;
      let pest2=this.p2.nativeElement;
      let pest3=this.p3.nativeElement;
      let pest4=this.p4.nativeElement;
      let pest5=this.p5.nativeElement;
      if(this.Npestañas==1){
        this.Renderer2.setStyle(pest2,'visibility','visible');
      } else if(this.Npestañas==2){
        this.Renderer2.setStyle(pest3,'visibility','visible');
      }else if(this.Npestañas==3){
        this.Renderer2.setStyle(pest4,'visibility','visible');
      }else if(this.Npestañas==4){
        this.Renderer2.setStyle(pest5,'visibility','visible');
      }
    console.log(this.indexPActual)
    this.Npestañas++;
    }else{
      alert('No se puede crear mas de 5 pestañas');
    }
  }
  updateIndex(iActual:number){
    this.indexPActual=iActual;
  }

  cargarDocument(documento:any):void{
    
    
    this.MjsExt.getDocumento(documento).then( contenido=>{
      console.log(contenido)
      this.setTextArea(contenido);
    })
    this.nameSaveF=this.file;
    this.file="";
  }
  setTextArea(Text:string){
    let element;
    if(this.indexPActual==0){
      this.tTextArea1=Text;
    }else if(this.indexPActual==1){
      this.tTextArea2=Text;
    } else if(this.indexPActual==2){
      this.tTextArea3=Text;
    }else if(this.indexPActual==3){
      this.tTextArea4=Text;
    }else if(this.indexPActual==4){
      this.tTextArea5=Text;
    }

  }
  save(){
    let lindex=this.nameSaveF.indexOf("path")+5; 
    let blob = new Blob([this.tTextArea1], {type: 'text/plain'});;
    this.nameSaveF=this.nameSaveF.substring(lindex,this.nameSaveF.length).toString();
    if(this.indexPActual==0){
      blob = new Blob([this.tTextArea1], {type: 'text/plain'});
    }else if(this.indexPActual==1){
      blob = new Blob([this.tTextArea2], {type: 'text/plain'});
    } else if(this.indexPActual==2){
      blob = new Blob([this.tTextArea3], {type: 'text/plain'});
    }else if(this.indexPActual==3){
      blob = new Blob([this.tTextArea4], {type: 'text/plain'});
    }else if(this.indexPActual==4){
      blob = new Blob([this.tTextArea5], {type: 'text/plain'});
    }

    saveAs(blob,this.nameSaveF);
  }
  saveAs(){
    let nameSave = prompt("Nombre del nuevo Archivo");
    if(nameSave!="" && nameSave!=null){
      let blob = new Blob([this.tTextArea1], {type: 'text/plain'});;
      if(this.indexPActual==0){
        blob = new Blob([this.tTextArea1], {type: 'text/plain'});
      }else if(this.indexPActual==1){
        blob = new Blob([this.tTextArea2], {type: 'text/plain'});
      } else if(this.indexPActual==2){
        blob = new Blob([this.tTextArea3], {type: 'text/plain'});
      }else if(this.indexPActual==3){
        blob = new Blob([this.tTextArea4], {type: 'text/plain'});
      }else if(this.indexPActual==4){
        blob = new Blob([this.tTextArea5], {type: 'text/plain'});
      }
      saveAs(blob,nameSave);
    }
  }
}
