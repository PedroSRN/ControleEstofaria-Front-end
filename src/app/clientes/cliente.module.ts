import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteAppComponent } from './cliente-app.component';
import { ListarClienteComponent } from './listar/listar-cliente.component';
import { ClienteService } from './services/cliente.service';
import { InserirClienteComponent } from './inserir/inserir-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClienteAppComponent,
    ListarClienteComponent,
    InserirClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService]
})
export class ClienteModule { }
