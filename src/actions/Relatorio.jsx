import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";

export const relatorio_get_search = async (id) => {
    const endp = endpoints.RELATORIO_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const relatorio_get_all = async () => {
    const endp = endpoints.RELATORIO_GET_ALL;
    return await ApiGet(endp)
}

export const relatorio_get_all_cnpj = async (cnpj) => {
    const endp = endpoints.RELATORIO_GET_ALL_CNPJ + '/?cnpj=' + cnpj;
    return await ApiGet(endp)
}

export const aluno_get_search = async (cpf) => {
    const endp = endpoints.ALUNO_GET + "/?cpf=" + cpf;
    return await ApiGet(endp)
}

export const relatorio_put_company = async (id, report) => {
    const endp = endpoints.RELATORIO_PUT_COMPANY;
    const data = {
        id: id,
        company_report: report,
    }
    return await ApiPut(endp, data)
}