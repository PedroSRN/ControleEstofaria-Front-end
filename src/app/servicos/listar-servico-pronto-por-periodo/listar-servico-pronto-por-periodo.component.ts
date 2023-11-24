import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarServicoViewModel } from '../view-models/listar-servico.view-model';
import { ServicoService } from '../services/servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-servico-pronto-por-periodo',
  templateUrl: './listar-servico-pronto-por-periodo.component.html',
})
export class ListarServicoProntoPorPeriodoComponent implements OnInit {
  public servicosProntosPorPeriodo$: Observable<ListarServicoViewModel[]>



  public formServicoPronto: FormGroup;
  valorServicosProntos: number | undefined;


  constructor(
    private servicoService: ServicoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    ){

  }

  ngOnInit(): void {
    this.formServicoPronto = this.formBuilder.group({
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],

    })


  }
  get dataInicio() {
    return this.formServicoPronto.get('dataInicio');
  }
  get dataFim() {
    return this.formServicoPronto.get('dataFim');
  }

  somarServicos(){
    if (this.formServicoPronto.invalid) {
      this.toastr.warning('Por favor, preencha o formulário corretamente antes de prosseguir.','Aviso');
      return;
    };

    // Converte as strings de data para objetos Date, se necessário
    const dataInicio = this.parseDataString(this.dataInicio?.value);
    const dataFim = this.parseDataString(this.dataFim?.value);


    this.servicoService.somarServicosProntosPorPeriodo(dataInicio, dataFim)
      .subscribe(valor => {
        console.log('Valor de Serviços Prontos: ', valor);

        this.valorServicosProntos = valor;

        // Chama a função para selecionar os serviços e atualizar a tabela
        this.atualizarServicos(dataInicio, dataFim);
      });
    }

    // Função para atualizar os serviços na tabela
    private atualizarServicos(dataInicio: Date, dataFim: Date) {
      this.servicosProntosPorPeriodo$ = this.servicoService.selecionarServicosProntosPorPeriodo(dataInicio, dataFim);
    }

    // Função auxiliar para converter strings de data em objetos Date
    private parseDataString(dataString: string): Date {
      const parsedDate = new Date(dataString);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    }
}
