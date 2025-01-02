import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SectorCardComponent } from 'app/components/sector-card/sector-card.component';  // Asumí que tienes un componente de tarjeta para sector
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Sector } from 'app/interfaces/sectores';  // Importar la interfaz de Sector
import { SectoresService } from 'app/services/sectores.service';  // El servicio para sectores

@Component({
  imports: [
    SectorCardComponent,
    SpinnerComponent,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './listado-sector.component.html',
  styleUrls: ['./listado-sector.component.css']
})
export class ListadoSectorComponent implements OnInit {
  private _sectoresService = inject(SectoresService);

  // Inicialización explícita de las señales
  public sectores = signal<Sector[]>([]);
  isLoading = signal<boolean>(true);  // Usar signal con valor inicial
  mensaje = 'Cargando listado de sectores';

  //*Recibir output del hijo
  wasDelete(x: boolean) {
    if (x) {
      this.isLoading.set(true);
      this.getAll();  // Actualizar lista al eliminar un sector
    }
  }

  ngOnInit() {
    this.getAll();  // Llamada inicial para obtener los sectores
  }

  getAll() {
    this._sectoresService.getSectores().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sectores.set(response.result);
        } else {
          // Puedes manejar casos en los que no sea exitoso
          this.mensaje = 'No se pudieron cargar los sectores';
        }
      },
      error: (err) => {
        this.mensaje = 'Error al cargar los sectores: ' + err.message;
        console.error(err);  // O puedes logear el error
      },
      complete: () => {
        this.isLoading.set(false);  // Asegurarte de desactivar el cargador al finalizar
      }
    });
  }
   // Método trackById
   trackById(index: number, sector: Sector): string {
    return sector.Id_sector;  // O usa la propiedad que identifica de forma única cada sector
  }
}
