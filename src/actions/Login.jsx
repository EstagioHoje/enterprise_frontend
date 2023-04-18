import { ApiGet } from "./server_core/api_get";
import { endpoints } from "./server_core/endpoint";

export const login_enterprise = async (cnpj, password) => {
    const endp = endpoints.EMPRESA_GET + "/?cnpj=" + cnpj;
    return await ApiGet(endp)
}