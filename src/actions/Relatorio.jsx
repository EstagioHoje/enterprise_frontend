import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";

export const relatorio_get_search = async (id) => {
    const endp = endpoints.RELATORIO_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const relatorio_get_all = async () => {
    const endp = endpoints.RELATORIO_GET_ALL;
    return await ApiGet(endp)
}

export const relatorio_post = async (id,report) => {
    const endp = endpoints.RELATORIO_POST;
    const data = {
        id: id,
        report: report,
    }
    const data2 = {
            student_name: "Vitor",
            student_full_name: "string",
            student_report: "string",
            student_cpf: "46491637816",
            company_name: "string",
            company_report: "string",
            company_cnpj: "200",
            grade: "string",
            contract_data: {
                teste: "teste"
            }
    
    }
    //console.log(data)
    return await ApiPost(endp, data2)
}