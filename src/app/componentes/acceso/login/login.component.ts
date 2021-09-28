import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuarioService:UsuarioService, private router:Router) { 
    this.inicializarVariables();
  }

  ngOnInit(): void {
    console.log("Imprimiendo VENTAS_APP_USER:", window.localStorage.getItem('VENTAS_APP_USER'));
    if (window.localStorage.getItem('VENTAS_APP_USER')) {
      this.router.navigate(['../menu']);
    }
  }
  
ingresar(frmAcceso: NgForm) {
     //alert("Validando")
     console.log('ingresando');
     if (frmAcceso.valid) {
       this.usuarioService.acceder(this.usuario);
     } else {
       alert('Llene todos los campos de acceso');
     }      
          //si el arreglo de usuarios es mayor a 0
            //almacenar al usuario de la posicion 0 en el localStorage
          /*this.usuarioService.acceder(this.usuario).subscribe((usuarios) => {                
            if (usuarios.length > 0) {          
              window.localStorage.setItem(
                'VENTAS_APP_USER',
                JSON.stringify(usuarios[0])
              );
            }
          });
        } else {
          alert('Llene todos los campos de acceso');
        }*/
  }

  inicializarVariables(){
      this.usuario = {};
  }
}
