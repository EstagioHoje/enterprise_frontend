import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";

export const vaga_get_search = async (id) => {
    const endp = endpoints.VAGA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const vaga_get_all = async () => {
    const endp = endpoints.VAGA_GET_ALL;
    return await ApiGet(endp)
}

export const vaga_get_all_cnpj = async (cnpj) => {
    const endp = endpoints.VAGA_GET_ALL_CNPJ + "/?cnpj=" + cnpj;
    return await ApiGet(endp)
}

export const vaga_post = async (cnpj,role, weekly_hours, physicality,
    vacancies, salary, description, requirements,company_name,address) => {
    const endp = endpoints.VAGA_POST;
    const data = {
        company_cnpj: cnpj,
        role: role,
        weekly_hours: weekly_hours,
        company_name: company_name,
        address: address,
        physicality: physicality,
        vacancies: vacancies,
        salary: salary,
        description: description,
        requirements: requirements
    }
    console.log(data)
    return await ApiPost(endp, data)
}

export const vaga_put = async (id,cnpj,role, weekly_hours, physicality,
    vacancies, salary, description, requirements,company_name,address) => {
    const endp = endpoints.VAGA_PUT;
    const data = {
        id: id,
        company_cnpj: cnpj,
        role: role,
        weekly_hours: weekly_hours,
        company_name: company_name,
        address: address,
        physicality: physicality,
        vacancies: vacancies,
        salary: salary,
        description: description,
        requirements: requirements
    }
    return await ApiPut(endp, data)
}

export const vaga_delete = async (id) => {
    const endp = endpoints.VAGA_DELETE + "/?id=" + id;
    return await ApiDelete(endp)
}

export const vaga_candidates = async (id) => {
    const endp = endpoints.VAGA_CANDIDATES + "/?id=" + id;
    return await ApiGet(endp)
}