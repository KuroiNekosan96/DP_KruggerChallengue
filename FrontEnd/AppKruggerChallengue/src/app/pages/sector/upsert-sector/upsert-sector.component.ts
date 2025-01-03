import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SectoresService } from 'app/services/sectores.service';
import { ToastrService } from 'ngx-toastr';
import { Sector } from 'app/interfaces/sectores';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upsert-sector',
  imports: [
    SpinnerComponent,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  templateUrl: './upsert-sector.component.html',
  styleUrls: ['./upsert-sector.component.css']
})
export class UpsertSectorComponent implements OnInit {
  private _activeRoute = inject(ActivatedRoute);
  private _route = inject(Router);
  private _sectoresService = inject(SectoresService);
  private _toast = inject(ToastrService);
  private _fb = inject(FormBuilder);

  titulo = 'Crear nuevo Sector';
  isLoading = false;
  mensaje = 'Consultando los datos del Sector';
  public formSector: FormGroup;
  public sector?: Sector;

  constructor() {
    this.formSector = this._fb.group({
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      nombre_sector: ['', [Validators.required, Validators.minLength(3)]],
      sec_long: ['', [Validators.required]],
      sec_lat: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this._sectoresService.getSector(id).subscribe({
        next: (resp) => {
          if (resp.isSuccess) {
            this.sector = resp.result;
            this.titulo = 'Editar datos del sector';
            this.formSector.patchValue(this.sector);
            this.addSecondsToTimeFields();
          }
          this.isLoading = false;
        },
        error: (isError: HttpErrorResponse) => {
          this._toast.error(isError.error.message, isError.statusText);
          this.isLoading = false;
          this._route.navigate(['/listaSector']);
        },
      });
    } else {
      // Si no es edición, inicializa valores por defecto
      this.formSector.patchValue({
        hora_inicio: '00:00:00',
        hora_fin: '00:00:00',
      });
    }
  }




  onSubmit() {
    if (this.formSector.valid) {
      // Formatear los valores de hora
      this.addSecondsToTimeFields();

      // Decidir si crear o editar
      this.sector?.id_sector ? this.editarSector() : this.nuevoSector();
    } else {
      this._toast.warning('El formulario no es correcto', 'Error');
    }
  }

  private addSecondsToTimeFields() {
    const horaInicio = this.formSector.value.hora_inicio;
    const horaFin = this.formSector.value.hora_fin;

    // Añadir segundos '00' si no están presentes
    this.formSector.patchValue({
      hora_inicio: horaInicio.length === 5 ? `${horaInicio}:00` : horaInicio,
      hora_fin: horaFin.length === 5 ? `${horaFin}:00` : horaFin,
    });
  }



  private nuevoSector() {
    const crearSector = this.formSector.value;
    this.addSecondsToTimeFields();
    this._sectoresService.postSector(crearSector).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Realizado');
          this.formSector.reset();
          this._route.navigate(['/listaSector']);
        }
      },
      error: (isError: HttpErrorResponse) => {
        this._toast.error(isError.error.message, isError.statusText);
      },
    });
  }

  private editarSector() {
    const crearSector = this.formSector.value;
    this.addSecondsToTimeFields();
    this._sectoresService.putSector(this.sector!.id_sector, crearSector).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Realizado');
          this.formSector.reset();
          this._route.navigate(['/listaSector']);
        }
      },
      error: (isError: HttpErrorResponse) => {
        this._toast.error(isError.error.message, isError.statusText);
      },
    });
  }



  invalidForm(campo: string): boolean {
    const control = this.formSector.get(campo);
    return !!control?.invalid && !!control?.touched;
  }

  messageError(campo: string): string {
    const control = this.formSector.get(campo);
    if (control?.hasError('required')) {
      return `El campo ${campo} es obligatorio.`;
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength']?.requiredLength;
      return `El campo ${campo} debe tener al menos ${requiredLength} caracteres.`;
    }
    return `El campo ${campo} no es válido.`;
  }





}
