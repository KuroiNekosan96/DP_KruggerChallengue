import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Cliente } from 'app/interfaces/cliente';
import { ClientesService } from 'app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [

    SpinnerComponent,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  private _activeRouter = inject(ActivatedRoute);
  private _clientesService = inject(ClientesService);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  mensaje = 'Buscando Al cliente';

  //*Propiedades
  isLoading = true;
  cliente?: Cliente;
  ngOnInit() {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/home']);
    } else {
      this._clientesService.getCliente(id).subscribe(
        (x) => {
          if (x.isSuccess) {
            this.cliente = x.result;
            setTimeout(() => {
              this.isLoading = false;
            }, 1400);
          } else {
            this._toast.error(x.message);
            this._router.navigate(['/home']);
          }
        },
        (error: HttpErrorResponse) => {
          this._toast.error(error.error.message);
          this._router.navigate(['/home']);
        }
      );
    }
  }
}