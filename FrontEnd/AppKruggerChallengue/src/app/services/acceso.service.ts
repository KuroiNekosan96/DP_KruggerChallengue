import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from 'app/interfaces/login';
import { ResponseAcceso } from 'app/interfaces/ResponseAcceso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private _baseUrl = "http://localhost:5100/api/";

  private http = inject(HttpClient);

  constructor() { }

  //segundoservicio login
  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this._baseUrl}AccesoCliente/Login`, objeto)
  }

  //validar token
  validarToken(token: string): Observable<ResponseAcceso> {
    return this.http.get<ResponseAcceso>(`${this._baseUrl}AccesoCliente/ValidarToken?token=${token}`)
  }
}
