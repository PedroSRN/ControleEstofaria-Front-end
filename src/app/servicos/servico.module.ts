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
import { EditarServicoComponent } from './editar-servico/editar-servico.component';
import { FormsServicoResolver } from './services/forms-servico.resolver';
import { ExcluirServicoComponent } from './excluir-servico/excluir-servico.component';
import { VisualizarServicoResolver } from './services/visualizar-servico.resolver';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ListarServicoProntoComponent } from './listar-servico-pronto/listar-servico-pronto.component';
import { ListarServicoProntoPorPeriodoComponent } from './listar-servico-pronto-por-periodo/listar-servico-pronto-por-periodo.component'


@NgModule({
  declarations: [
    ServicoAppComponent,
    InserirServicoComponent,
    EditarServicoComponent,
    ExcluirServicoComponent,
    ListarServicoComponent,
    ListarServicoProntoComponent,
    ListarServicoProntoPorPeriodoComponent,

    //pipes
    NotDeliveredPipe,
      //metodo está na pasta services
    //
  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,

  ],
  providers: [ServicoService, ClienteService, FormsServicoResolver, VisualizarServicoResolver,provideNgxMask()]
})
export class ServicoModule { }
