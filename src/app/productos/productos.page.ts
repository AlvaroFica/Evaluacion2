import { Component, OnInit } from '@angular/core';
import { ProductosService } from './../servicio/producto/productos.service';
import { Producto } from './../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter,ViewDidLeave  {

  items: number[] = []; 
  itemsPerPage = 20; 

  public productos: Producto[] = [];
  private subProducto!: Subscription;


  constructor(
    private prdS: ProductosService,
  ) {
    this.cargarMasDatos();
  }

  cargarMasDatos(event?: any) {
    // Simulación de carga de más datos
    const nuevosItems = this.items.length + this.itemsPerPage;
    for (let i = this.items.length; i < nuevosItems; i++) {
      this.items.push(i + 1);
    }

    // Finaliza el evento de infinite scroll si existe
    if (event) {
      event.target.complete();
    }
  }

  ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.subProducto = this.prdS.producto.subscribe(productos => {
      this.productos = productos;
    });
    this.prdS.listarProductos();
  }

  
}
