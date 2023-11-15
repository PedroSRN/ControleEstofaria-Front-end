import { Injectable } from "@angular/core";
import { VisualizarServicoViewModel } from "../view-models/visualizar-servico.view-model";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ServicoService } from "./servico.service";
import { Observable } from "rxjs";

@Injectable()
export class VisualizarServicoResolver implements Resolve<VisualizarServicoViewModel>{

  constructor(private servicoService: ServicoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarServicoViewModel> {
    return this.servicoService.selecionarServicoCompletoPorId(route.params['id']);
 }
}
