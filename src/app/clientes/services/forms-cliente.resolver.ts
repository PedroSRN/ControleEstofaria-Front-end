import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { FormsClienteViewModel } from "../view-models/forms-cliente.view-model";

import { Observable } from "rxjs";
import { ClienteService } from "./cliente.service";

@Injectable()
export class FormsClienteResolver implements Resolve<FormsClienteViewModel> {

  constructor(private clienteService: ClienteService){ }


  resolve(route: ActivatedRouteSnapshot): Observable<FormsClienteViewModel>{
    return this.clienteService.selecionarPorId(route.params['id']);

  }
}
