import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoService } from '../services/servico.service';
import { ListarServicoViewModel } from '../view-models/listar-servico.view-model';

@Component({
  selector: 'app-listar-servico',
  templateUrl: './listar-servico.component.html',

})
export class ListarServicoComponent implements OnInit{
 public servicos$: Observable<ListarServicoViewModel[]>

  constructor(private servicoService: ServicoService){

  }
  ngOnInit(): void {
    this.servicos$ = this.servicoService.selelecionarTodos();
  }


}
