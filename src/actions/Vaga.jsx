import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";

export const vaga_get_search = async (id) => {
    const endp = endpoints.VAGA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const vaga_get_all_cnpj = async (cnpj) => {
    const endp = endpoints.VAGA_GET_ALL_CNPJ + "/?cnpj=" + cnpj;
    return await ApiGet(endp)
}

export const vaga_candidates = async (id) => {
    const endp = endpoints.VAGA_CANDIDATES + "/?id=" + id;
    return await ApiGet(endp)
}

export const vaga_post = async (
    role,
    company_name,
    weekly_hours,
    address,
    physicality,
    vacancies,
    salary,
    description,
    requirements,
    cnpj
) => {
    const endp = endpoints.VAGA_POST;
    const data = {
        role: role,
        company_name: company_name,
        weekly_hours: weekly_hours,
        address: address,
        physicality: physicality,
        vacancies: vacancies,
        salary: salary,
        description: description,
        requirements: requirements,
        company_cnpj: cnpj
    }
    return await ApiPost(endp, data)
}

export const vaga_put = async (
    role,
    weekly_hours,
    physicality,
    vacancies,
    salary,
    description,
    requirements,
    cnpj
) => {
    const endp = endpoints.VAGA_PUT;
    const data = {
        role: role,
        weekly_hours: weekly_hours,
        physicality: physicality,
        vacancies: vacancies,
        salary: salary,
        description: description,
        requirements: requirements,
        company_cnpj: cnpj
    }
    return await ApiPut(endp, data)
}

export const vaga_delete = async (id) => {
    const endp = endpoints.VAGA_DELETE + "/?id=" + id;
    return await ApiDelete(endp)
}