import { Component } from '@angular/core';
import { Usuario } from './interfaces/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSession: boolean;
  usuario: Usuario = {};

  //title = 'ventasApp';
  //14/09/2021
  constructor() { 
    this.usuario = JSON.parse(window.localStorage.getItem('VENTAS_APP_USER'));
  }

}
