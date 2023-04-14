import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";


export const login_post = async (email,password) => {
    const endp = endpoints.EMPRESA_POST;
    const data = {
        email: senha,
        password: password,
    }
    console.log(data)
    return await ApiPost(endp, data)
}