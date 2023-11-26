import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarServicoViewModel } from '../view-models/listar-servico.view-model';
import { ServicoService } from '../services/servico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-servico-pronto',
  templateUrl: './listar-servico-pronto.component.html',

})
export class ListarServicoProntoComponent implements OnInit {
  public servicosProntos$: Observable<ListarServicoViewModel[]>

  constructor(
    private servicoService: ServicoService,
    private toastr: ToastrService
  ){

  }
  ngOnInit(): void {
    this.servicosProntos$ = this.servicoService.selelecionarServicosProntos();

    this.servicosProntos$.subscribe(servicos => {
      if (servicos.length === 0) {
        // Lista vazia, exibir mensagem
        this.toastr.info('Não há serviços prontos.');
      }
    });
  }


}

