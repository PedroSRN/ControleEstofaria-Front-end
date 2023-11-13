import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { ListarServicoViewModel } from "../view-models/listar-servico.view-model";
import { FormsServicoViewModel } from "../view-models/forms-servico.view-model";

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ){ }

  public inserir(servico: FormsServicoViewModel): Observable<FormsServicoViewModel> {
    const resposta = this.http
      .post<FormsServicoViewModel>(this.apiUrl + 'servicos', servico, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selelecionarTodos(): Observable<ListarServicoViewModel[]> {
    const resposta = this.http
      .get<ListarServicoViewModel[]>(this.apiUrl + 'servicos', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterTokenUsuario();
    return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
    }

  }

  private processarDados(resposta: any){
    if (resposta?.sucesso)
      return resposta.dados;
    else
      return resposta;
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
