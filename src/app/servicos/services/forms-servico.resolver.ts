import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { FormsServicoViewModel } from "../view-models/forms-servico.view-model";
import { ServicoService } from "./servico.service";
import { Observable } from "rxjs";

@Injectable()
export class FormsServicoResolver implements Resolve<FormsServicoViewModel> {

  constructor(private servicoService: ServicoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsServicoViewModel> {
    return this.servicoService.selecionarPorId(route.params['id']);
  }
}
