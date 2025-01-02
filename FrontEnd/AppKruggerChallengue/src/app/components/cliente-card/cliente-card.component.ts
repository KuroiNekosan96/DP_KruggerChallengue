import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Cliente } from 'app/interfaces/cliente/cliente.interface';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../services/clientes.service';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.css']
})
export class ClienteCardComponent {

  @Input() cliente!: Cliente; 
  @Output() wasRemove = new EventEmitter<boolean>();

  private _dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  private _clientesService = inject(ClientesService);

  // Método para eliminar
  onDelete() {
    if (!this.cliente?.id_clie) {
      this._toast.error("Error al eliminar", "Error");
      return;
    }

    //Llama el componente con el diálogo de confirmación
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: true,
      enterAnimationDuration: '650ms',
      exitAnimationDuration: '450ms',
    });

    dialogRef
      .afterClosed()
      .pipe(
        //Procede a eliminar si hay confirmacion
        filter((x) => x),
        switchMap(() =>
          this._clientesService.deleteCliente(this.cliente.id_clie) 
        )
      )
      .subscribe(
        (resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Realizado');
            this.wasRemove.emit(true); //* Emitir valor
          }
        },
        (isError: HttpErrorResponse) => {
          if (isError) {
            this._toast.error(isError.error.message, isError.statusText);
          }
        }
      );
  }
}
