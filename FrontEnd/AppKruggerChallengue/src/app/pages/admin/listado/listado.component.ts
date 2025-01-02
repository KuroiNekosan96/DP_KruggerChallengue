import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ClienteCardComponent } from 'app/components/cliente-card/cliente-card.component';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { Cliente } from 'app/interfaces/cliente';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  imports: [
    ClienteCardComponent,
    SpinnerComponent,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  private _clientesService = inject(ClientesService);
  public clientes: WritableSignal<Cliente[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  mensaje = 'Cargando listado de clientes'; 
  //*Recibir output del hijo
  wasDelete(x: boolean) {
    if (x) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.getAll();
      }, 1500);
    }
  }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this._clientesService.getClientes().subscribe((x) => {
      if (x.isSuccess) {
        this.clientes.set(x.result);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1200);
      }
    });
  }
}