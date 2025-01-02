import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectorResponse, SectoresResponse, CrearactualizarSector, CrearSectorResponse, ActualizarSectorResponse, EliminarSectorResponse } from 'app/interfaces/sectores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {

  // URL base para las rutas de la API de sectores
  private _baseUrl = "http://localhost:5100/api/Sector/";

  constructor(private http: HttpClient) { }

  // Obtener todos los sectores
  getSectores(): Observable<SectoresResponse> {
    return this.http.get<SectoresResponse>(`${this._baseUrl}ListarSectores`);
  }

  // Obtener un sector por su id
  getSector(id: string): Observable<SectorResponse> {
    return this.http.get<SectorResponse>(`${this._baseUrl}${id}`);
  }

  // Crear un nuevo sector
  postSector(nuevoSector: CrearactualizarSector): Observable<CrearSectorResponse> {
    return this.http.post<CrearSectorResponse>(`${this._baseUrl}RegistrarSectores`, nuevoSector);
  }

  // Actualizar un sector existente
  putSector(id: string, sector: CrearactualizarSector): Observable<ActualizarSectorResponse> {
    return this.http.put<ActualizarSectorResponse>(`${this._baseUrl}ActualizarSector/${id}`, sector);
  }

  // Eliminar un sector
  deleteSector(id: string): Observable<EliminarSectorResponse> {
    return this.http.delete<EliminarSectorResponse>(`${this._baseUrl}EliminarSector/${id}`);
  }
}
