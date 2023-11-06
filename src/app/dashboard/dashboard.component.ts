import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../core/services/usuario.service';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public usuarioLogado$: Observable<UsuarioTokenViewModel | null>;

  constructor(
    titulo: Title,
    private usuarioService: UsuarioService
    ) {
      titulo.setTitle('Dashboard - Controle Estofaria');
    }


  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }

}
