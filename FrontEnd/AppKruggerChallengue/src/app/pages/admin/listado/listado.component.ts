import { Component, inject, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ClienteCardComponent } from 'app/components/cliente-card/cliente-card.component';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Cliente } from 'app/interfaces/cliente';
import { ClientesService } from 'app/services/clientes.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    CommonModule,
    ClienteCardComponent,
    SpinnerComponent,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  private _clientesService = inject(ClientesService);

  public clientes: WritableSignal<Cliente[]> = signal([]);
  public isLoading: WritableSignal<boolean> = signal(true);
  public mensaje = 'Cargando listado de clientes';

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading.set(true);
    this._clientesService.getClientes().subscribe((response) => {
      if (response.isSuccess) {
        this.clientes.set(response.result);
      }
      this.isLoading.set(false);
    });
  }

  wasDelete(deleted: boolean): void {
    if (deleted) {
      this.getAll();
    }
  }

  trackByCliente(index: number, cliente: Cliente): string {
    return cliente.id_clie; // Retorna el ID único del cliente
  }
}
