export class TokenViewModel {
  chave: string;
  dataExpiracao: Date;

  usuarioToken: UsuarioTokenViewModel;
}

export class UsuarioTokenViewModel{
  id: string;
  nome: string;
  email: string;
}
