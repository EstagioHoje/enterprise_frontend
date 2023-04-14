export const endpoints = {
    VAGA_GET: 'vacancy/getID',
    VAGA_GET_ALL: 'vacancy/get/all',
    VAGA_GET_ALL_CNPJ: 'vacancy/get/all_cnpj',
    VAGA_POST: 'vacancy/post/',
    VAGA_PUT: 'vacancy/put/',
    VAGA_DELETE: 'vacancy/delete',
    VAGA_CANDIDATES: 'vacancy/get/candidates',

    ASSINATURA_GET: 'contract/get',
    ASSINATURA_GET_ALL: 'contract/get/all',
    ASSINATURA_GET_ALL_CNPJ: 'contract/get/all_cnpj',
    ASSINATURA_POST: 'contract/post/',
    ASSINATUTA_GET_ALUNO: 'student/get_company',

    RELATORIO_GET: 'report/get',
    RELATORIO_GET_ALL: 'report/get/all',
    RELATORIO_POST: 'report/post/',

    EMPRESA_GET: 'company/get',
    EMPRESA_POST: 'company/post/',
    EMPRESA_PUT: 'company/put/',
    EMPRESA_DELETE: 'company/delete',
    EMPRESA_GET_ALL: 'company/get/all'
  };

export const api_links = {
  BACKEND: 'http://ec2-54-146-77-15.compute-1.amazonaws.com:8000',
  FRONTEND: 'http://localhost:1234'
};

export const headers = {
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
};

export const headers_post = {
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
  }
};