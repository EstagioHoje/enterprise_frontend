import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";

export const assinatura_get_search = async (id) => {
    const endp = endpoints.ASSINATURA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const assinatura_get_all_cnpj = async (cnpj) => {
    const endp = endpoints.ASSINATURA_GET_ALL_CNPJ + "?cnpj=" + cnpj;
    return await ApiGet(endp)
}

export const assinatura_post = async (start_date,end_date,weekly_hours,salary,
    transport_bonus,description,student_data,student_cpf,student_college,
    company_data,company_cnpj) => {
    const endp = endpoints.ASSINATURA_POST;
    const data = {
        student_data: student_data,
        student_cpf: student_cpf,
        student_college: student_college,
        company_data: company_data,
        company_cnpj: company_cnpj,
        start_date: start_date,
        end_date: end_date,
        weekly_hours: weekly_hours,
        salary: salary,
        transport_bonus: transport_bonus,
        description: description,
    }
    console.log(data)
    return await ApiPost(endp, data)
}

export const aluno_get = async (id,cpf) => {
    const endp = endpoints.ASSINATUTA_GET_ALUNO +  "/?id=" + id + "&cpf=" + cpf;
    return await ApiGet(endp)
}