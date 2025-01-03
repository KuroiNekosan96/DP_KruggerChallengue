import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Sector } from 'app/interfaces/sectores/sector.interface';
import { SectoresService } from 'app/services/sectores.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-sector',
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
  templateUrl: './detalle-sector.component.html',
  styleUrl: './detalle-sector.component.css'
})
export class DetalleSectorComponent {

  private _activeRouter = inject(ActivatedRoute);
  private _sectoresService = inject(SectoresService);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  mensaje = 'Buscando el sector';

  isLoading = true;
  sector?: Sector;

  ngOnInit() {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/listaSector']);
    } else {
      this._sectoresService.getSector(id).subscribe(
        (x) => {
          if (x.isSuccess) {
            this.sector = x.result;
            setTimeout(() => {
              this.isLoading = false;
            }, 1400);
          } else {
            this._toast.error(x.message);
            this._router.navigate(['/listaSector']);
          }
        },
        (error: HttpErrorResponse) => {
          this._toast.error(error.error.message);
          this._router.navigate(['/listaSector']);
        }
      );
    }
  }

  // Agregar la función goBack() para manejar la acción del botón "Volver"
  goBack(): void {
    this._router.navigate(['/listaSector']);  // Puedes cambiar la ruta si es necesario
  }

  getFormattedTime(time: string): string {
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), Number(seconds));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
