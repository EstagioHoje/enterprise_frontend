import axios from 'axios';
import { api_links, headers_post } from "./endpoint";

/**
 * @brief Put data to server.
 *
 * @param endpoint_name Title to the data location in the API.
 * @param data data to send.
 *
 * @returns Data received from server.
 */
export const ApiPut = async (endpoint_name, data) => {
    const link_api = api_links.BACKEND + '/' + endpoint_name;
    let value = null;
    try {
        await axios.put(link_api, data, headers_post).then(response => { 
            value = response 
            return response 
        });
    } catch (error) {
        console.log(error.response);
        // return null;
    }
    return value
};