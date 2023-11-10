import { Injectable } from "@angular/core";
import { VisualizarClienteViewModel } from "../view-models/visualizar-cliente.view-model";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ClienteService } from "./cliente.service";
import { Observable } from "rxjs";

@Injectable()
export class VisualizarClienteResolver implements Resolve<VisualizarClienteViewModel> {

  constructor(private clienteService: ClienteService){ }

  resolve(router: ActivatedRouteSnapshot): Observable<VisualizarClienteViewModel> {
    return this.clienteService.selecionarClienteCompletoPorId(router.params['id']);
  }
}
