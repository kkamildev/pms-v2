import axios from "axios";
import { useErrorStore } from "./stores";


const useApi = () => {
    const updateError = useErrorStore((state) => state.update);
    const get = async (url, onSuccess, onClientError, onServerError) => {
        try {
            const response = await axios.get(url);
            onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(null);
            }
        }
    }
    const post = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.post(url, body, config);
            onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(null);
            }
        }
    }
    const deleteReq = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.delete(url, {data:body, ...config});
            onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(null);
            }
        }
    }
    const put = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.put(url, body, config);
            onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(null);
            }
        }
    }
    return {get, post, deleteReq, put}
}

export default useApi;