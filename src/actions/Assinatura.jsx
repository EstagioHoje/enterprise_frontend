import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";

export const assinatura_get_search = async (id) => {
    const endp = endpoints.ASSINATURA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const assinatura_get_all_cnpj = async (cnpj) => {
    const endp = endpoints.ASSINATURA_GET_ALL_CNPJ + "?cnpj=" + cnpj;
    return await ApiGet(endp)
}

export const assinatura_post = async (
    student_cpf,
    company_data,
    company_cnpj,
    start_date,
    end_date,
    weekly_hours,
    salary,
    transport_bonus,
    status,
    description
) => {

    const endp = endpoints.ASSINATURA_POST;
    const data = {
        student_cpf: student_cpf,
        company_cnpj: company_cnpj,
        start_date: start_date,
        end_date: end_date,
        weekly_hours: weekly_hours,
        salary: salary,
        transport_bonus: transport_bonus,
        status: status,
        description: description,
    }
    console.log(endp)
    console.log(data)
    return await ApiPost(endp, data)
}

export const assinatura_empresa = async (id) => {
    const endp = endpoints.ASSINATURA_SIGN_COMPANY + "?id=" + id;
    return await ApiPut(endp)
}

export const assinatura_reject_company = async (id,reject_reason) => {
    const endp = endpoints.ASSINATURA_REJECT_COMPANY + "?id=" + id + "&reject_reason=" + reject_reason;
    return await ApiPut(endp)
}

export const aluno_get_search = async (cpf) => {
    const endp = endpoints.ALUNO_GET + "/?cpf=" + cpf;
    return await ApiGet(endp)
}
