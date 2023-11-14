import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoAppComponent } from './servico-app.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { ListarServicoComponent } from './listar-servico/listar-servico.component';
import { InserirServicoComponent } from './inserir-servico/inserir-servico.component';
import { EditarServicoComponent } from './editar-servico/editar-servico.component';
import { FormsServicoResolver } from './services/forms-servico.resolver';

const routes: Routes = [
  {
    path: '', component: ServicoAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListarServicoComponent },
      { path: 'inserir', component: InserirServicoComponent },
      {
        path: 'editar/:id',
        component: EditarServicoComponent,
        resolve: { servico: FormsServicoResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
