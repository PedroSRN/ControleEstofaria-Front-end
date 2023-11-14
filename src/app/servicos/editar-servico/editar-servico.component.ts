import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormaPagamento } from '../view-models/formaPagamentoEnum';
import { StatusServico } from '../view-models/statusServicoEnum';
import { FormsServicoViewModel } from '../view-models/forms-servico.view-model';
import { Title } from '@angular/platform-browser';
import { ServicoService } from '../services/servico.service';
import { ClienteService } from 'src/app/clientes/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editar-servico.component.html',
  styles: [
  ]

})
export class EditarServicoComponent implements OnInit {
  public formServico: FormGroup;

  public clientes = this.clienteService.selecionarTodos();

  public formasPagamento = Object.values(FormaPagamento)
  .filter(v => !Number.isFinite(v));

  public statusDoServico = Object.values(StatusServico)
  .filter(v => !Number.isFinite(v));

  public servicoFormVM : FormsServicoViewModel = new FormsServicoViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    titulo.setTitle('Editar Servico - Controle Estofaria');
  }

  ngOnInit(): void {
    this.servicoFormVM = this.route.snapshot.data['servico']

    this.formServico = this.formBuilder.group({
      nomeServico: ['', [Validators.required, Validators.minLength(3)]],
      dataEntradaServico: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      dataSaidaServico: [''],
      valorServico: ['', [Validators.required]],
      formaPagamento: ['', [Validators.minLength(3)]],
      statusServico: ['', [Validators.minLength(3)]],
      cliente: ['', [Validators.minLength(3)]],
      clienteId: ['', [Validators.minLength(3)]],
    });

    this.formServico.patchValue({
      id: this.servicoFormVM.id,
      nomeServico: this.servicoFormVM.nomeServico,
      descricao: this.servicoFormVM.descricao,
      dataEntradaServico: this.servicoFormVM.dataEntradaServico.toString().split("T")[0],
      dataSaidaServico: this.servicoFormVM.dataSaidaServico.toString().split("T")[0],
      valorServico: this.servicoFormVM.valorServico,
      formaPagamento: this.servicoFormVM.formaPagamento,
      statusServico: this.servicoFormVM.statusServico,
      clienteId: this.servicoFormVM.clienteId,
    })
  }

  get nomeServico() {
    return this.formServico.get('nomeServico');
  }
  get descricao() {
    return this.formServico.get('descricao');
  }
  get dataEntradaServico() {
    return this.formServico.get('dataEntradaServico');
  }
  get dataSaidaServico() {
    return this.formServico.get('dataSaidaServico');
  }
  get valorServico() {
    return this.formServico.get('valorServico');
  }
  get formaPagamento() {
    return this.formServico.get('formaPagamento');
  }
  get statusServico() {
    return this.formServico.get('statusServico');
  }
  get cliente() {
    return this.formServico.get('cliente');
  }
  get clienteId() {
    return this.formServico.get('clienteId');
  }

  public gravar() {
    if (this.formServico.invalid) {
      this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
      return;
    };

    this.servicoFormVM = Object.assign({}, this.servicoFormVM, this.formServico.value);

    this.servicoService.editar(this.servicoFormVM)
      .subscribe({
        next: (servicoEditado) => this.processarSucesso(servicoEditado),
        error: (erro) => this.processarFalha(erro)
      })
  }

    private processarSucesso(servico: FormsServicoViewModel): void {
      this.router.navigate(['/servicos/listar']);
      this.toastr.success('Serviço Editado com sucesso.','Edição de Serviços');
    }

    private processarFalha(erro: any) {
      if(erro) {
        this.toastr.error(erro, 'Ediçao de Serviços');
        console.error(erro);
      }
    }


}
