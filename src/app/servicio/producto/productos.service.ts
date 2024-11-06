import { Injectable } from '@angular/core';
import { Producto  } from './../../interfaces/Producto';
import { ProductoRespuesta } from './../../interfaces/ProductoRespuesta';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products'
  private saltar = 0;
  private cantidad = 0;
  private total = 0;
  private $productos = new BehaviorSubject<Producto[]>([]);
  public producto = this.$productos.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public listarProductos(){
    const url_nueva = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=0`;
    this.http.get<ProductoRespuesta>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accessToken,
        'Content-type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }
  public siguientesProductos(){
    this.saltar = this.saltar + this.cantidad;
    const url_nueva = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=${this.saltar}`;
    this.http.get<ProductoRespuesta>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });

  }

  public productosAnterior(){
    const resta = this.saltar - this.cantidad;
    if(resta < 0){
      this.saltar = 0;
    }
    else {
      this.saltar = this.saltar - this.cantidad;
    }
    const url_nueva = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=${this.saltar}`;
    this.http.get<ProductoRespuesta>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }

}

