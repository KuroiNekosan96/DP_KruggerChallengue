import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Sector } from 'app/interfaces/sectores/sector.interface';  // Asegúrate de que la interfaz de Sector esté bien importada
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SectoresService } from '../../services/sectores.service';  // Servicio para sectores
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-sector-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sector-card.component.html',
  styleUrls: ['./sector-card.component.css'],
  providers: [DatePipe]
})
export class SectorCardComponent {

  @Input() sector!: Sector;  // Asegúrate de usar la interfaz Sector
  @Output() wasRemove = new EventEmitter<boolean>();

  constructor(private datePipe: DatePipe) {}

  // Método para formatear la hora
  getFormattedHora(hora: string): string {
    const date = new Date(`1970-01-01T${hora}`); // Crear un objeto Date con una fecha arbitraria
    return this.datePipe.transform(date, 'shortTime')!;
  }

  private _dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  private _sectoresService = inject(SectoresService);

 
  // Método para eliminar
  onDelete() {
    console.log("ID del sector:", this.sector?.id_sector); 
    if (!this.sector?.id_sector) {
      this._toast.error("Error al eliminar", "Error");
      return;
    }
  
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: true,
      enterAnimationDuration: '650ms',
      exitAnimationDuration: '450ms',
    });
  
    dialogRef.afterClosed()
      .pipe(
        filter((x) => x),
        switchMap(() => this._sectoresService.deleteSector(this.sector.id_sector))
      )
      .subscribe(
        (resp) => {
          console.log('Respuesta del servicio:', resp);  // Verifica la respuesta aquí
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Realizado');
            this.wasRemove.emit(true); // Emitir valor
          } else {
            this._toast.error("No se pudo eliminar", "Error");
          }
        },
        (error) => {
          console.error('Error al eliminar el sector:', error);  // Verifica el error
          this._toast.error("No se pudo eliminar", "Error");
        }
      );
  }}