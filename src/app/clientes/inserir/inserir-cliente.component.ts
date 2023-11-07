import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsClienteViewModel } from '../view-models/forms-cliente.view-model';
import { Title } from '@angular/platform-browser';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styles: [
  ]
})
export class InserirClienteComponent implements OnInit {
  public formCliente: FormGroup;

  public clienteFormVM : FormsClienteViewModel = new FormsClienteViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService
  ) {
    titulo.setTitle('Cadastrar Cliente - Controle Estofaria');
  }

  ngOnInit(): void {
    this.formCliente = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
    });
  }

  get nome() {
    return this.formCliente.get('nome');
   }

  get telefone() {
    return this.formCliente.get('telefone');
   }

   get email() {
    return this.formCliente.get('email');
   }

   get cnpj() {
    return this.formCliente.get('cnpj');
   }


   public gravar(){
    if (this.formCliente.invalid){
      this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
      return;
    };

    this.clienteFormVM = Object.assign({}, this.clienteFormVM, this.formCliente.value);

    this.clienteService.inserir(this.clienteFormVM)
      .subscribe({
        next: (clienteInserido) => this.processarSucesso(clienteInserido),
        error: (erro) => this.processarFalha(erro)
      })
   }

   private processarSucesso(filme: FormsClienteViewModel): void {
    this.router.navigate(['/clientes/listar']);
    this.toastr.success('Cliente Inserido com sucesso.','Inserção de Clientes');
  }

  private processarFalha(erro: any) {
    if(erro) {
      this.toastr.error(erro, 'Inserção de Clientes');
      console.error(erro);
    }
  }

}
