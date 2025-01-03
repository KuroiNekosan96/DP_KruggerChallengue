import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SectorCardComponent } from 'app/components/sector-card/sector-card.component';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Sector } from 'app/interfaces/sectores/sector.interface';
import { SectoresService } from 'app/services/sectores.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    CommonModule, // Importar para soportar *ngIf y *ngFor
    SectorCardComponent,
    SpinnerComponent,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './listado-sector.component.html',
  styleUrls: ['./listado-sector.component.css'],
})
export class ListadoSectorComponent implements OnInit {
  private _sectoresService = inject(SectoresService);

  public sectores: WritableSignal<Sector[]> = signal([]);
  public isLoading: WritableSignal<boolean> = signal(true);
  public mensaje = 'Cargando listado de sectores';

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading.set(true);
    this._sectoresService.getSectores().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sectores.set(response.result);
        } else {
          this.mensaje = 'Error al cargar los sectores.';
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar sectores:', err);
        this.mensaje = 'Error al cargar los sectores.';
        this.isLoading.set(false);
      },
    });
  }

  wasDelete(deleted: boolean): void {
    if (deleted) {
      this.getAll();
    }
  }

  trackBySector(index: number, sector: Sector): string {
    return sector.id_sector; // Usar id_sector como clave única
  }
}
