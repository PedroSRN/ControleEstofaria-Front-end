import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';


const routes: Routes = [
  { path: '', redirectTo: 'conta/autenticar', pathMatch: 'full'},
  { path: 'conta/autenticar', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'conta/registrar', component: RegistroComponent, canActivate: [LoginGuard] },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/cliente.module')
      .then(m => m.ClienteModule)
  },
  {
    path: 'servicos',
    loadChildren: () => import('./servicos/servico.module')
      .then(m => m.ServicoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
