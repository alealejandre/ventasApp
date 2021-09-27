import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './interfaces/usuario';
import { UsuarioService } from './servicios/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSession: boolean;
  //usuario: Usuario = {};
  nombre_a_pasar:string='Galleta de atún';

  //title = 'ventasApp';
  //14/09/2021
  constructor(private router: Router, private usuarioService: UsuarioService) { 
    //this.usuario = JSON.parse(window.localStorage.getItem('VENTAS_APP_USER'));
  }
  logOut() {
    this.usuarioService.logOut();
  }

  checkLogin() {
    return this.usuarioService.checkLoging();
  }

}
