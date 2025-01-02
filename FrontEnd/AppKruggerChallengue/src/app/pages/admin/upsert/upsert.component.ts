import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Cliente, CrearActualizar } from 'app/interfaces/cliente';
import { ClientesService } from 'app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'], // Corregido
})
export class UpsertComponent implements OnInit {
  private _activeRoute = inject(ActivatedRoute);
  private _route = inject(Router);
  private _clientesService = inject(ClientesService);
  private _toast = inject(ToastrService);
  private _fb = inject(FormBuilder);

  titulo = 'Crear nuevo Cliente';
  isLoading = false;
  mensaje = 'Consultando los datos del cliente';
  public formCliente: FormGroup;
  private cliente?: Cliente;

  constructor() {
    this.formCliente = this._fb.group({
      ci: ['', [Validators.required, Validators.minLength(10)]],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      user_clie: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      dom_long: ['', [Validators.required]],
      dom_lat: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this._clientesService.getCliente(id).subscribe({
        next: (resp) => {
          if (resp.isSuccess) {
            this.cliente = resp.result;
            this.titulo = 'Editar datos del cliente';
            this.formCliente.patchValue(this.cliente);
          }
          this.isLoading = false;
        },
        error: (isError: HttpErrorResponse) => {
          this._toast.error(isError.error.message, isError.statusText);
          this.isLoading = false;
          this._route.navigate(['/home']);
        },
      });
    }
  }

  onSubmit() {
    if (this.formCliente.valid) {
      this.cliente?.id_clie ? this.editarCliente() : this.nuevoCliente();
    } else {
      this._toast.warning('El formulario no es correcto', 'Error');
    }
  }
  
  private nuevoCliente() {
    const crearCliente = this.formCliente.value;
    this._clientesService.postCliente(crearCliente).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Realizado');
          this.formCliente.reset();
          // Redirigir a home después de guardar el cliente
          this._route.navigate(['/home']);
        }
      },
      error: (isError: HttpErrorResponse) => {
        this._toast.error(isError.error.message, isError.statusText);
      },
    });
  }
  
  private editarCliente() {
    const crearCliente = this.formCliente.value;
    this._clientesService.putCliente(this.cliente!.id_clie, crearCliente).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Realizado');
          this.formCliente.reset();
          // Redirigir a home después de editar el cliente
          this._route.navigate(['/home']);
        }
      },
      error: (isError: HttpErrorResponse) => {
        this._toast.error(isError.error.message, isError.statusText);
      },
    });
  }
  

  invalidForm(campo: string): boolean {
    const control = this.formCliente.get(campo);
    return !!control?.invalid && !!control?.touched; // Asegura que ambos valores sean booleanos
  }

  messageError(campo: string): string {
    const control = this.formCliente.get(campo);
    if (control?.hasError('required')) {
      return `El campo ${campo} es obligatorio.`;
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength']?.requiredLength;
      return `El campo ${campo} debe tener al menos ${requiredLength} caracteres.`;
    }
    if (control?.hasError('email')) {
      return `El campo ${campo} debe ser un correo electrónico válido.`;
    }
    return `El campo ${campo} no es válido.`;
  }
}
