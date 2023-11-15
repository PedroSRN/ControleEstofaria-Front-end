import { ListarClienteViewModel } from "src/app/clientes/view-models/listar-cliente.view-model";

export class VisualizarServicoViewModel {
  id: string;
  nomeServico: string;
  descricao: string;
  dataEntradaServico: string;
  dataSaidaServico: string;
  valorServico: number;
  formaPagamento: string;
  statusServico: string;
  cliente:	ListarClienteViewModel;
}
