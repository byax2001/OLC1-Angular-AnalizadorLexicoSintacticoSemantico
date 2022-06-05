import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//SERVICIOS
import{MJsExternosService} from './m-js-externos.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './PagesWeb/principal/principal.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
   
    AppRoutingModule
  ],
  providers: [
    MJsExternosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
