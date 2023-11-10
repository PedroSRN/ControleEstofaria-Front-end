import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAppComponent } from './cliente-app.component';
import { ListarClienteComponent } from './listar/listar-cliente.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { InserirClienteComponent } from './inserir/inserir-cliente.component';
import { EditarClienteComponent } from './editar/editar-cliente.component';
import { FormsClienteResolver } from './services/forms-cliente.resolver';

const routes: Routes = [
{
  path: '', component: ClienteAppComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'listar', component: ListarClienteComponent },
    { path: 'inserir', component: InserirClienteComponent },
    {
      path: 'editar/:id',
      component: EditarClienteComponent,
      resolve: { cliente: FormsClienteResolver }
    },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
