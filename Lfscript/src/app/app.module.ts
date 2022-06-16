import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
//SERVICIOS
import{MJsExternosService} from './m-js-externos.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './PagesWeb/principal/principal.component';
import { AstComponent } from './PagesWeb/Ast/ast/ast.component';
import { EnviromentComponent } from './PagesWeb/Enviroments/enviroment/enviroment.component';
import { ErroresComponent } from './PagesWeb/Errores/errores/errores.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AstComponent,
    EnviromentComponent,
    ErroresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodemirrorModule
  ],
  providers: [
    MJsExternosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
