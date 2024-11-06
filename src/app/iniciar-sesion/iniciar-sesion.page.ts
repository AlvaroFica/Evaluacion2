import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../servicio/auth/auth.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements ViewWillEnter, ViewDidLeave {
  public formulario!: FormGroup;
  public cargandoBloqueo: boolean = false;
  public subCargando!: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.formulario = fb.group({
      usuario: ['', [Validators.required]],
      contrasenna: ['', [Validators.required]]
    })
  }
  
  public validarFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      return
    }
    const datos = this.formulario.getRawValue();
    const usuario = datos['usuario'];
    const contrasenna = datos['contrasenna'];
    this.auth.iniciarSesion(usuario, contrasenna);
  }


  ionViewWillEnter(): void {
    this.subCargando = this.auth.cargando.subscribe(nuevoValor => {
      this.cargandoBloqueo = nuevoValor;
    })
  }


  ionViewDidLeave(): void {
    if(this.subCargando){
      this.subCargando.unsubscribe();
    }
  }



}
