import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';
import { ListarClienteViewModel } from '../view-models/listar-cliente.view-model';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',

})
export class ListarClienteComponent implements OnInit{
  public clientes$: Observable<ListarClienteViewModel[]>


  constructor(private clienteService: ClienteService){

  }


  ngOnInit(): void {
    this.clientes$ = this.clienteService.selecionarTodos();

  }

}
