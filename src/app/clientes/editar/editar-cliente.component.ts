import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsClienteViewModel } from '../view-models/forms-cliente.view-model';
import { Title } from '@angular/platform-browser';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styles: [
  ]
})
export class EditarClienteComponent  implements OnInit{
  public formCliente: FormGroup;

  public clienteFormVM : FormsClienteViewModel = new FormsClienteViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){
    titulo.setTitle("Editar Cliente - Controle Estofaria")
  }


  ngOnInit(): void {
    this.clienteFormVM = this.route.snapshot.data['cliente'];


    this.formCliente = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
    });

    this.formCliente.patchValue({
      id: this.clienteFormVM.id,
      nome: this.clienteFormVM.nome,
      telefone: this.clienteFormVM.telefone,
      email: this.clienteFormVM.email,
      cnpj: this.clienteFormVM.cnpj,
    })
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
      if(this.formCliente.invalid){
        this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
        return;
      };

      this.clienteFormVM = Object.assign({}, this.clienteFormVM, this.formCliente.value);

      this.clienteService.editar(this.clienteFormVM)
        .subscribe({
          next: (clienteEditado) => this.processarSucesso(clienteEditado),
          error: (erro) => this.processarFalha(erro)

        })
   }

   private processarSucesso(cliente: FormsClienteViewModel) {
      this.router.navigate(['/clientes/listar']);
      this.toastr.success('Cliente Editado com sucesso.','Edição de Clientes');
   }

   private processarFalha(erro: any) {
    if(erro) {
      this.toastr.error(erro, 'Ediçao de Clientes');

      console.error(erro);
    }
  }
}
