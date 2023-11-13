import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoAppComponent } from './servico-app.component';
import { ListarServicoComponent } from './listar-servico/listar-servico.component';
import { ServicoService } from './services/servico.service';
import { InserirServicoComponent } from './inserir-servico/inserir-servico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ClienteService } from '../clientes/services/cliente.service';
import { NotDeliveredPipe } from './services/verificarDataEntrega';


@NgModule({
  declarations: [
    ServicoAppComponent,
    ListarServicoComponent,
    InserirServicoComponent,
    NotDeliveredPipe

  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgSelectModule,

  ],
  providers: [ServicoService, ClienteService]
})
export class ServicoModule { }
