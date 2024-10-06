import { Routes } from '@angular/router';
import { CreateAutoComponent } from './componentes/create-auto/create-auto.component';
import { ListarAutosComponent } from './componentes/listar-autos/listar-autos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarAutosComponent},
  { path: 'crear', component: CreateAutoComponent},
  { path: 'editar/:id', component: CreateAutoComponent},
  { path: '**', redirectTo: 'listar', pathMatch: 'full'},

];
