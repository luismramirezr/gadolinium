export default {
  Application: {
    Name: 'SBCMTC',
  },
  UX: {
    Table: {
      NoData: 'Nenhum dado encontrado',
    },
    UserMenu: {
      Logout: 'Encerrar sessão',
    },
  },
  Navigation: {
    Dashboard: 'Dashboard',
    Catalog: {
      Title: 'Catalogo',
      Categories: 'Categorias',
      Products: 'Produtos',
    },
  },
  Forms: {
    Errors: {
      Required: 'Este campo é obrigatório',
      InvalidEmail: 'O email é inválido',
    },
  },
  Pages: {
    SignIn: {
      Fields: {
        Email: {
          Placeholder: 'Email',
        },
        Password: {
          Placeholder: 'Senha',
        },
      },
      Buttons: {
        RememberMe: 'Lembrar-me',
        LogIn: 'Entrar',
        ForgotPassword: 'Esqueceu a senha?',
      },
    },
    Dashboard: {
      Title: 'Dashboard',
    },
    Clients: {
      Title: 'Inscritos',
      Table: {
        Headers: {
          Name: 'Nome',
          CPF: 'CPF',
          Local: 'Local',
          Email: 'E-mail',
          Phone: 'Telefone',
          View: 'Visualizar',
        },
      },
    },
    Transactions: {
      Title: 'Transações',
      Table: {
        Headers: {
          Code: 'Código',
          Client: 'Inscrito',
          Location: 'Local',
          Reference: 'Referência',
          Status: 'Status',
          Date: 'Data',
          PaymentMethod: 'Forma de Pagamento',
          paymentLink: 'Link Boleto',
          grossAmount: 'Valor Bruto',
          feeAmount: 'Tarifa',
          netAmount: 'Valor Liquido',
          extraAmount: 'Valor Adicional',
          installmentCount: 'Parcelas',
        },
      },
    },
  },
};
