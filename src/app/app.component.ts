import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from './core/services/usuario.service';
import { LocalStorageService } from './auth/services/local-storage.service';

@Component({
  selector: 'app-root',
  template : `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'ControleEstofaria-Front-end';

  constructor(
    titulo : Title,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService
    ){
    titulo.setTitle("Início - Controle de Estofaria");
    this.logarUsuarioPersistido();
  }

  private logarUsuarioPersistido() {
    const usuarioPersistido = this.localStorageService.obterUsuarioLogado();

    if(usuarioPersistido)
      this.usuarioService.logarUsuario(usuarioPersistido);
  }
}
