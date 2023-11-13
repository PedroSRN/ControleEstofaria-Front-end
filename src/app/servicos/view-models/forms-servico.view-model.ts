import { FormaPagamento } from "./formaPagamentoEnum"
import { StatusServico } from "./statusServicoEnum";

export class FormsServicoViewModel {
  id: string;
  nomeServico: string;
  descricao: string;
  dataEntradaServico: string;
  dataSaidaServico:	string;
  valorServico: number;
  formaPagamento: FormaPagamento;
  statusServico: StatusServico;
  clienteId:	string;
}
