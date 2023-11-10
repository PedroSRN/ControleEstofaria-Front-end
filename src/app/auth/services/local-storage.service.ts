import { Injectable } from "@angular/core";
import { TokenViewModel, UsuarioTokenViewModel } from "../view-models/token.view-model";

@Injectable()
export class LocalStorageService {

  public salvarDadosLocalUsuario(resposta: TokenViewModel):void {
    this.salvarTokenUsuario(resposta.chave);
    this.salvarUsuario(resposta.usuarioToken)
  }


  public salvarTokenUsuario(token: string){
    localStorage.setItem('ControleEstofaria.token', token)
  }

  public salvarUsuario(usuario: UsuarioTokenViewModel){
    const jsonString = JSON.stringify(usuario);

    localStorage.setItem('ControleEstofaria.usuario', jsonString);
  }

  public obterUsuarioLogado() {
    const usuarioJson = localStorage.getItem('ControleEstofaria.usuario');

    if (usuarioJson)
      return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

    return null;
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('ControleEstofaria.token') ?? '';
  }

  public limparDadosLocais(){
    localStorage.removeItem('ControleEstofaria.token');
    localStorage.removeItem('ControleEstofaria.usuario');
  }
}
