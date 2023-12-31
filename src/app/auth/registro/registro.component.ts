import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RegistrarUsuarioViewModel } from '../view-models/registrar-usuario.view-model';
import { AuthService } from '../services/auth.service';
import { TokenViewModel } from '../view-models/token.view-model';
import { LocalStorageService } from '../services/local-storage.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
  public form: FormGroup;

  private registroVM: RegistrarUsuarioViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
    ) {
    titulo.setTitle('Registro - Controle Estofaria');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

   get nome() {
    return this.form.get('nome')
   }

   get email() {
    return this.form.get('email')
   }

   get senha() {
    return this.form.get('senha')
   }

   get confirmarSenha() {
    return this.form.get('confirmarSenha')
   }


  public registrar() {
    if(this.form.invalid) {
      this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
      return;
    };

    this.registroVM = Object.assign({}, this.registroVM, this.form.value);

    this.authService.registrarUsuario(this.registroVM)
     .subscribe({
      next: (registroRealizado) => this.processarSucesso(registroRealizado),
      error: (erro) => this.processarErro(erro)
     });

  }

  private processarSucesso(registroRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocalUsuario(registroRealizado);
    this.usuarioService.logarUsuario(registroRealizado.usuarioToken);
    this.router.navigate(['/dashboard']);
  }

  private processarErro(erro: any) {
    this.toastr.error(erro, 'Erro')
    console.log(erro);
  }
}
