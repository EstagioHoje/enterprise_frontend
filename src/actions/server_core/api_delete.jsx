import axios from 'axios';
import { api_links, headers } from "./endpoint";

/**
 * @brief Get data from server.
 *
 * @param endpoint_name Title to the data location in the API.
 *
 * @returns Data received from server.
 */
export const ApiDelete = async (endpoint_name) => {
    const link = api_links.BACKEND + '/' + endpoint_name;
    let value = null
    try {
        await axios.delete(link,headers).then(response => { 
            value = response 
            return response 
        });
    } catch (error) {
        console.log(error.response);
    }
    return value;
};