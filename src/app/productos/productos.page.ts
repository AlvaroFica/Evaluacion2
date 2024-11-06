import { Component, OnInit } from '@angular/core';
import { ProductosService } from './../servicio/producto/productos.service';
import { Producto } from './../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 

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
    private router:Router



  ) {
    
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

  //Salir y terminar la sesion
  salir() {
    this.router.navigate(['/iniciar-sesion']);

  }

  
}
