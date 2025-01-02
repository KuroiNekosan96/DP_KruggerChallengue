import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActualizarResponse, ClienteResponse, ClientesResponse, CrearActualizar, CrearResponse, EliminarResponse } from 'app/interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  private _baseUrl ="http://localhost:5100/";

  private http=inject(HttpClient);
  constructor() { }

  getClientes():Observable<ClientesResponse>{
    return this.http.get<ClientesResponse>(
      `${this._baseUrl}Listar`
    )
  }
  getCliente(id:string):Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(
      `${this._baseUrl}api/Cliente/${id}`
    )
  }
  postCliente(nuevoCliente: CrearActualizar): Observable<CrearResponse> {
    return this.http.post<CrearResponse>(
      `${this._baseUrl}Registrar`,
      nuevoCliente
    );
  }
  putCliente(
    id: string,
    cliente: CrearActualizar
  ): Observable<ActualizarResponse> {
    return this.http.put<ActualizarResponse>(
      `${this._baseUrl}api/Cliente/Actualizar/${id}`,
      cliente
    );
  }
  deleteCliente(id: string): Observable<EliminarResponse> {
    return this.http.delete<EliminarResponse>(
      `${this._baseUrl}api/Cliente/Eliminar/${id}`
    );
  }
}