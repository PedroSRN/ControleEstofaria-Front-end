import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarServicoViewModel } from '../view-models/listar-servico.view-model';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-listar-servico-pronto',
  templateUrl: './listar-servico-pronto.component.html',

})
export class ListarServicoProntoComponent implements OnInit {
  public servicosProntos$: Observable<ListarServicoViewModel[]>

  constructor(private servicoService: ServicoService){

  }
  ngOnInit(): void {
    this.servicosProntos$ = this.servicoService.selelecionarServicosProntos();
  }


}

