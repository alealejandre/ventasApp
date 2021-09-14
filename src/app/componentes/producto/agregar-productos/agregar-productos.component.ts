import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';


@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {
  producto: Producto;
  constructor(private productoService:ProductoService) { 
        this.inicializarVariables();

  }

  registrarProducto(frmRegistro: NgForm) {
    if (frmRegistro.valid) {
      this.productoService
        .agregarProducto(this.producto)
        .then(() => {
          alert('Producto agregado correctamente');
        })
        .catch((error) => {
          alert('Error al agregar un producto: ' + error);
        });
    } else {
      alert('Formulario invalido! revise los campos obligatorios');
    }
  }


  ngOnInit(): void {
  }
  
  limpiarCampos() {}
  inicializarVariables() {
    this.producto = {};
  }
 
}
