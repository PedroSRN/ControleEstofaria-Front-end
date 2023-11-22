import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { ListarServicoViewModel } from "../view-models/listar-servico.view-model";
import { FormsServicoViewModel } from "../view-models/forms-servico.view-model";
import { VisualizarServicoViewModel } from "../view-models/visualizar-servico.view-model";

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

  public editar(servico: FormsServicoViewModel): Observable<FormsServicoViewModel> {
    const resposta = this.http
      .put<FormsServicoViewModel>(this.apiUrl + 'servicos/' + servico.id, servico, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'servicos/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selelecionarTodos(): Observable<ListarServicoViewModel[]> {
    const resposta = this.http
      .get<ListarServicoViewModel[]>(this.apiUrl + 'servicos', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public selelecionarServicosProntos(): Observable<ListarServicoViewModel[]> {
    const resposta = this.http
      .get<ListarServicoViewModel[]>(this.apiUrl + 'servicos/Selecionar-Servicos-Prontos', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      console.log(resposta);
      return resposta;

  }
 //-------------------------------------------------------------------------------------

 public selecionarServicosProntosPorPeriodo(dataInicio: Date, dataFim: Date): Observable<any> {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const params = new HttpParams()
    .set('dataInicio', formatDate(dataInicio))
    .set('dataFim', formatDate(dataFim));

  const headers = this.obterHeadersAutorizacao();

  return this.http.get(`${this.apiUrl}servicos/Selecionar-Servicos-Prontos-Por-Periodo`, { params, ...headers});
}
//===================================================================================================

public somarServicosProntosPorPeriodo(dataInicio: Date, dataFim: Date): Observable<number> {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const params = new HttpParams()
    .set('dataInicio', formatDate(dataInicio))
    .set('dataFim', formatDate(dataFim));
  const headers = this.obterHeadersAutorizacao();

  return this.http.get<number>(`${this.apiUrl}servicos/Somar-Servicos-Prontos-Por-Periodo`, { params, ...headers });
}


//-------------------------------------------------------------------------------------

  public selecionarPorId(id: string): Observable<FormsServicoViewModel> {
    const resposta = this.http
      .get<FormsServicoViewModel>(this.apiUrl + 'servicos/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarServicoCompletoPorId(id: string): Observable<VisualizarServicoViewModel> {
    const resposta = this.http
      .get<VisualizarServicoViewModel>(this.apiUrl + 'servicos/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
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
