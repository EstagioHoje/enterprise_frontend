export const endpoints = {
  VAGA_PUT: 'vacancy/put/',
  VAGA_GET: 'vacancy/getID',
  VAGA_POST: 'vacancy/post/',
  VAGA_APPLY: 'vacancy/apply',
  VAGA_DELETE: 'vacancy/delete',
  VAGA_GET_ALL: 'vacancy/get/all',
  VAGA_GET_ALL_CNPJ: 'vacancy/get/all_cnpj',
  VAGA_CANDIDATES: 'vacancy/get/candidates',

  ASSINATURA_GET: 'contract/get',
  ASSINATURA_PUT: 'contract/put',
  ASSINATURA_POST: 'contract/post/',
  ASSINATURA_GET_ALL: 'contract/get/all',
  ASSINATURA_GET_ALL_CPF: 'contract/get/all_cpf',
  ASSINATURA_GET_ALL_UNI: 'contract/get/all_uni',
  ASSINATURA_GET_ALL_CNPJ: 'contract/get/all_cnpj',
  ASSINATURA_SIGN_STUDENT: 'contract/put/sign_student',
  ASSINATURA_SIGN_TEACHER: 'contract/put/sign_teacher',
  ASSINATURA_SIGN_COMPANY: 'contract/put/sign_company',
  ASSINATURA_REJECT_STUDENT: 'contract/put/reject_student',
  ASSINATURA_REJECT_COMPANY: 'contract/put/reject_company',
  ASSINATURA_REJECT_TEACHER: 'contract/put/reject_teacher',

  RELATORIO_GET: 'report/get',
  RELATORIO_POST: 'report/post',
  RELATORIO_GET_ALL: 'report/get/all',
  RELATORIO_GET_ALL_CPF: 'report/get/all_cpf',
  RELATORIO_GET_ALL_UNI: 'report/get/all_uni',
  RELATORIO_PUT_COMPANY: 'report/put/company',
  RELATORIO_PUT_STUDENT: 'report/put/student',
  RELATORIO_PUT_TEACHER: 'report/put/teacher',
  RELATORIO_GET_ALL_CNPJ: 'report/get/all_cnpj',

  ALUNO_GET: 'student/get',
  ALUNO_GET_ALL: 'student/get/all',
  ALUNO_GET_COMPANY: 'student/get_company',
  ALUNO_POST: 'student/post/',
  ALUNO_PUT: 'student/put/',
  ALUNO_DELETE: 'student/delete',

  PROFESSOR_GET: 'teacher/get',
  PROFESSOR_PUT: 'teacher/put/',
  PROFESSOR_POST: 'teacher/post/',
  PROFESSOR_DELETE: 'teacher/delete',
  PROFESSOR_GET_ALL: 'teacher/get/all',

  EMPRESA_GET: 'company/get',
  EMPRESA_PUT: 'company/put/',
  EMPRESA_POST: 'company/post/',
  EMPRESA_DELETE: 'company/delete',
  EMPRESA_GET_ALL: 'company/get/all',
};

export const api_links = {
BACKEND: 'http://ec2-3-142-212-243.us-east-2.compute.amazonaws.com:8000',
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
