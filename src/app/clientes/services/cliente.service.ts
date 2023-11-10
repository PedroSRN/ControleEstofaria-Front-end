import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ListarClienteViewModel } from "../view-models/listar-cliente.view-model";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { FormsClienteViewModel } from "../view-models/forms-cliente.view-model";

@Injectable()
export class ClienteService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ){ }

  public inserir(cliente: FormsClienteViewModel): Observable<FormsClienteViewModel> {
    const resposta = this.http
      .post<FormsClienteViewModel>(this.apiUrl + 'clientes', cliente, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public editar(cliente: FormsClienteViewModel): Observable<FormsClienteViewModel> {
    const resposta = this.http
      .put<FormsClienteViewModel>(this.apiUrl + 'clientes/' + cliente.id, cliente, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selelecionarTodos(): Observable<ListarClienteViewModel[]> {
    const resposta = this.http
      .get<ListarClienteViewModel[]>(this.apiUrl + 'clientes', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

      return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsClienteViewModel> {
    const resposta = this.http
      .get<FormsClienteViewModel>(this.apiUrl + 'clientes/' + id, this.obterHeadersAutorizacao())
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
    if (resposta.sucesso)
      return resposta.dados;
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.Error(resposta.error.erros[0])));
  }
}
