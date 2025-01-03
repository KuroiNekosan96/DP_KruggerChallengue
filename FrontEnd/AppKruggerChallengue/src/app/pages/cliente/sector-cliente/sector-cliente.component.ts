import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sector-cliente',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './sector-cliente.component.html',
  styleUrl: './sector-cliente.component.css'
})
export class SectorClienteComponent {

  constructor(private router: Router) { }

  cerrarSesion() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/inicio']); // Redirige al componente de inicio de sesión
  }

}
