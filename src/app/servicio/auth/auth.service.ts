import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuerpoUsuario } from 'src/app/interfaces/CuerpoLogin';
import { UsuarioLogeado } from 'src/app/interfaces/UsuarioLogeado';
import {Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variable para guardar URL_login
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  
  //Creacion de variables;
  public usuarioLogeado: UsuarioLogeado | null = null;

  //variable para el token
  public accessToken: string | null = null;

  //variable para observador
  public $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public iniciarSesion(nombre_usuario: string, contrasenna: string){
    const cuerpo: CuerpoUsuario = {
      username: nombre_usuario,
      password: contrasenna,
    }
    this.http.post<UsuarioLogeado>(this.URL_LOGIN, JSON.stringify(cuerpo), {
      headers: {
        'Content-type': 'application/json' 
      }
    })
    .subscribe(resultado => {
      this.usuarioLogeado = resultado;
      this.accessToken = resultado.accessToken;
      console.log(resultado);
      this.router.navigate(['/', 'productos'])
    });
  }

  public cerrarSesion(){
    if(this.usuarioLogeado){
      this.usuarioLogeado = null;
      this.accessToken = null;
    }
  }
}
