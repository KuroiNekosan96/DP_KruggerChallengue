import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/admin/listado/listado.component';
import { UpsertComponent } from './pages/admin/upsert/upsert.component';
import { DetalleComponent } from './pages/admin/detalle/detalle.component';
import { InicioComponent } from './pages/cliente/inicio/inicio.component';
import { ListadoSectorComponent } from './pages/sector/listado-sector/listado-sector.component';
import { UpsertSectorComponent } from './pages/sector/upsert-sector/upsert-sector.component';
import { DetalleSectorComponent } from './pages/sector/detalle-sector/detalle-sector.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: ListadoComponent },
  { path: 'nuevo', component: UpsertComponent },
  { path: 'editar/:id', component: UpsertComponent },
  { path: 'detalle/:id', component: DetalleComponent },


  {path: 'listaSector',component:ListadoSectorComponent},
  {path: 'nuevoSector', component: UpsertSectorComponent },
  { path: 'editarSector/:id', component: UpsertSectorComponent },
  { path: 'detalleSector/:id', component: DetalleSectorComponent },


  {path: 'inicioliente',component:InicioComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
