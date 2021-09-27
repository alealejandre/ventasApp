import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Venta } from 'src/app/interfaces/venta';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css'],
})
export class ListarVentasComponent implements OnInit {

  lista_ventas: Venta[];  
  //imagenSeleccionada: string;
  venta_seleccionada: Venta;
  //ventaService: any;

public isCollapsed = true;
  constructor(private ngbModal: NgbModal, private ventaService: VentaService) {
    this.inicializarVariables();
  }

  ngOnInit(): void {
    this.listarVentas();
  }
  
  
  listarVentas() {        
     this.ventaService.listarVentas().subscribe((ventas) => {
      this.lista_ventas = ventas;
      //console.log(this.lista_ventas[0]);
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


  abrirModalDetalles(modalDetalles, venta) {
    this.venta_seleccionada = venta;
    this.ngbModal
      .open(modalDetalles, {
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


  /*abrirModalImagen(modalImagen, url_imagen) {
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
  */
  inicializarVariables() {
    this.lista_ventas = [];    
    //this.imagenSeleccionada = '';
    this.venta_seleccionada = {};
  }
  
}
