import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  usuario: Usuario;
  contrasena_confirmar: any;
  mensaje_contrasena: string;
  rol_seleccionado: Rol;
  roles: Rol[];
  roles_seleccionados: Rol[];

  constructor(private usuarioService: UsuarioService, private router:Router) {
    //llamar y añaden alguna configuracion al servicio
    this.inicializarVariables();
  }

  
  ngOnInit(): void {
    this.usuario = {};
    this.mensaje_contrasena = '';
    this.listarRoles();
  }
  
  listarRoles() {
    this.usuarioService.listarRoles().subscribe((roles) => {
      console.log('roles:', roles);
      this.roles = roles;
    });
  }

  
  registrarUsuario(frmRegistro: NgForm) {
    if (frmRegistro.valid) {
      if (this.roles_seleccionados.length > 0) {
        //añadir los roles seleccionados al usuario
        this.usuario.roles = this.roles_seleccionados;
        //registrar al usuario
        this.usuarioService.agregarUsuario(this.usuario).then(() => {
          alert('Usuario registrado correctamente!');
          this.router.navigate(['../login']);
        });
      } else {
        alert('Añadir almenos 1 rol!');
      }
    } else {
      alert('Formulario invalido! revise los campos obligatorios');
    }
  }

  limpiarCampos() {}

  quitarRol(indice) {
    // [ -
    //   indice: 0, value:'rol1',
    // -
    //   indice: 1, value:'rol2'
    // ]
    this.roles_seleccionados.splice(indice, 1);
  }


  passwordDif(): boolean {
    return this.usuario.contrasena != this.contrasena_confirmar ? true : false;
  }

  keyPress(event) {
    if (this.passwordDif()) {
      this.mensaje_contrasena = '';
    } else {
      this.mensaje_contrasena = '*Contraseñas no coinciden';
    }
  }


  addRol() {
    if (this.existeRol()) {
      console.log('el rol ya fue seleccionado');
    } else {
      //añadir Rol
      this.roles_seleccionados.push(this.rol_seleccionado);
    }
  }

  existeRol(): boolean {
    let existe_rol = this.roles_seleccionados.find(
      (rol) => rol.rol_id == this.rol_seleccionado.rol_id
    );

    if (existe_rol) {
      return true;
    } else {
      return false;
    }
  }

  inicializarVariables() {
    this.roles = [];
    this.roles_seleccionados = [];
    this.rol_seleccionado = {};
    this.usuario = {};
    this.contrasena_confirmar = {};
    this.mensaje_contrasena = '';
  }


}
