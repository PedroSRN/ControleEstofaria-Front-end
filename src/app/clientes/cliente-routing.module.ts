import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAppComponent } from './cliente-app.component';
import { ListarClienteComponent } from './listar/listar-cliente.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { InserirClienteComponent } from './inserir/inserir-cliente.component';

const routes: Routes = [
{
  path: '', component: ClienteAppComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full'},
    { path: 'listar', component: ListarClienteComponent},
    { path: 'inserir', component: InserirClienteComponent},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
