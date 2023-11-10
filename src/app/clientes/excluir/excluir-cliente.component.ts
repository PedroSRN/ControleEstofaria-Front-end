import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VisualizarClienteViewModel } from '../view-models/visualizar-cliente.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-cliente',
  templateUrl: './excluir-cliente.component.html',
  styles: [
  ]
})
export class ExcluirClienteComponent implements OnInit {

  public clienteFormVM: VisualizarClienteViewModel = new VisualizarClienteViewModel();
  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {
    titulo.setTitle('Excluir Cliente - Controle Estofaria');
  }

  ngOnInit(): void {
    this.clienteFormVM = this.route.snapshot.data['cliente'];
  }

  public gravar(){
    this.clienteService.excluir(this.clienteFormVM.id)
      .subscribe({
        next: (clienteId) => this.processarSucesso(clienteId),
        error: (erro) => this.processarFalha(erro)

      })
  }

  private processarSucesso(clienteId: string): void {
    this.router.navigate(['/clientes/listar']);
    this.toastr.success('Cliente Excluido com sucesso.','Exclusão de Clientes');
  }

  private processarFalha(erro: any) {
    if(erro) {
      this.toastr.error(erro, 'Exclusão de Clientes');
      console.error(erro);
    }
  }

}
