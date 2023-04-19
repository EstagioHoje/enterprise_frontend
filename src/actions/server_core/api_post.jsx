import axios from 'axios';
import { api_links, headers_post } from "./endpoint";

/**
 * @brief Post data to server.
 *
 * @param endpoint_name Title to the data location in the API.
 * @param data data to send.
 *
 * @returns Data received from server.
 */
export const ApiPost = async (endpoint_name, data) => {
    const link_api = api_links.BACKEND + '/' + endpoint_name;
    let value = null
    try {
        await axios.post(link_api, data, headers_post).then(response => { 
            value = response 
            return response 
        });
    } catch (error) {
        console.log(error.response);
    }
    return value;
};