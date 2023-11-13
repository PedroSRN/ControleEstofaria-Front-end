import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormaPagamento } from '../view-models/formaPagamentoEnum';
import { StatusServico } from '../view-models/statusServicoEnum';
import { FormsServicoViewModel } from '../view-models/forms-servico.view-model';
import { Title } from '@angular/platform-browser';
import { ServicoService } from '../services/servico.service';
import { ClienteService } from 'src/app/clientes/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-servico',
  templateUrl: './inserir-servico.component.html',

})
export class InserirServicoComponent implements OnInit {
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
    private toastr: ToastrService,
    private router: Router

  ) {
    titulo.setTitle('Cadastrar Servico - Controle Estofaria');
  }

  ngOnInit(): void {
    this.formServico = this.formBuilder.group({
      nomeServico: ['', [Validators.required], [Validators.minLength(3)]],
      descricao: ['', [Validators.required], [Validators.minLength(6)]],
      dataEntradaServico: ['', [Validators.required]],
      dataSaidaServico: [''],
      valorServico: ['', [Validators.required]],
      formaPagamento: ['', [Validators.minLength(3)]],
      statusServico: ['', [Validators.minLength(3)]],
      cliente: ['', [Validators.minLength(3)]],
      clienteId: ['', [Validators.minLength(3)]],
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

    public gravar(){
    if (this.formServico.invalid) {
      this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
      return;
   };

  this.servicoFormVM = Object.assign({}, this.servicoFormVM, this.formServico.value);

    this.servicoService.inserir(this.servicoFormVM)
      .subscribe({
        next: (servicoInserido) => this.processarSucesso(servicoInserido),
        error: (erro) => this.processarFalha(erro)
      })
  }


  private processarSucesso(sessao: FormsServicoViewModel): void {
    this.router.navigate(['/servicos/listar']);
    this.toastr.success('Serviço Inserido com sucesso.','Inserção de Serviços');
  }

  private processarFalha(erro: any) {
    if(erro) {
      this.toastr.error(erro, 'Inserção de Serviços');
      console.error(erro);
    }
  }
}


