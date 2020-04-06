import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = true
  textoError: string = ''
  constructor(private creadorFormulario: FormBuilder,
    private afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar() {

    if (this.formularioLogin.valid) {
      this.spinner.show();
      this.datosCorrectos = true
      this.afAuth.auth.signInWithEmailAndPassword(
        this.formularioLogin.value.email, this.formularioLogin.value.password
      ).then((user) => {
        //console.log(user)
        this.spinner.hide()
      }).catch((err) => {
        this.datosCorrectos = false
        this.textoError = err.message
        this.spinner.hide()
      })

    } else {
      this.datosCorrectos = false
      this.textoError = 'Por favor revisar que los datos sean coreectos.'
    }
  }

}
