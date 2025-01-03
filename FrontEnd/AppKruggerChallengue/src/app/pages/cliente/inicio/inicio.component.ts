import { Component, inject } from '@angular/core';
import { AccesoService } from '../../../services/acceso.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Login } from 'app/interfaces/login';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatIcon
  ],

  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  //crear el formulario
  public formLogin: FormGroup = this.formBuild.group({
    user_clie: ['', Validators.required],
    password: ['', Validators.required]
  })

  //metodo para iniciar sesion
  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const objeto: Login = {
      user_clie: this.formLogin.value.user_clie,
      password: this.formLogin.value.password
    }

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          localStorage.setItem("token", data.token)
          this.router.navigate(["SectorCliente"])
        } else {
          alert("Credenciales son incorrectas")
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    })

  }


}
