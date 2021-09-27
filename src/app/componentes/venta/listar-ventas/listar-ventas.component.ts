import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css'],
})
export class ListarVentasComponent implements OnInit {

  lista_ventas: Venta[];  
  imagenSeleccionada: string;
  //ventaService: any;

  constructor( private ngbModal: NgbModal,private ventaService: VentaService ) { 
    this.inicializarVariables();
  }

  ngOnInit(): void {
    this.listarVentas();
  }
  listarVentas() {    
    
     this.ventaService.listarVentas().subscribe((ventas) => {
      this.lista_ventas = ventas;
    });
  }


  
  
  abrirModalAgregar(modalAgregar) {
    this.ngbModal
      .open(modalAgregar, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  
  abrirModalImagen(modalImagen, url_imagen) {
    this.imagenSeleccionada = url_imagen;
    this.ngbModal
      .open(modalImagen, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  inicializarVariables() {
    this.lista_ventas = [];    
    this.imagenSeleccionada = '';
  }
  
}
