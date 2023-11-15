import { Component, OnInit } from '@angular/core';
import { VisualizarServicoViewModel } from '../view-models/visualizar-servico.view-model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../services/servico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-servico',
  templateUrl: './excluir-servico.component.html',
  styles: [
  ]
})
export class ExcluirServicoComponent implements OnInit{
  public servicoFormVM: VisualizarServicoViewModel = new VisualizarServicoViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private servicoService: ServicoService,
    private toastr: ToastrService

  ) {
    titulo.setTitle('Excluir Serviço - Controle Estofaria');
  }

  ngOnInit(): void {
    this.servicoFormVM = this.route.snapshot.data['servico']
  }

  public gravar(){

    this.servicoService.excluir(this.servicoFormVM.id)
      .subscribe({
        next: (servicoId) => this.processarSucesso(servicoId),
        error: (erro) => this.processarFalha(erro)
    })
  }

  private processarSucesso(sessaoId: string): void {
    this.router.navigate(['/servicos/listar']);
    this.toastr.success('Servico Exclúido com sucesso.','Exclusão de Serviços');

  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error(erro, 'Exclusão de Serviços');
      console.error(erro);
    }
  }

}
