import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteAppComponent } from './cliente-app.component';
import { ListarClienteComponent } from './listar/listar-cliente.component';
import { ClienteService } from './services/cliente.service';
import { InserirClienteComponent } from './inserir/inserir-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarClienteComponent } from './editar/editar-cliente.component';
import { FormsClienteResolver } from './services/forms-cliente.resolver';
import { ExcluirClienteComponent } from './excluir/excluir-cliente.component';
import { VisualizarClienteResolver } from './services/visualizar-cliente.resolver';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'


@NgModule({
  declarations: [
    ClienteAppComponent,
    ListarClienteComponent,
    InserirClienteComponent,
    EditarClienteComponent,
    ExcluirClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [ClienteService, FormsClienteResolver, VisualizarClienteResolver,provideNgxMask()]
})
export class ClienteModule { }
