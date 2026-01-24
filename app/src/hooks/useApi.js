import axios from "axios";
import { useErrorStore } from "./stores";


const useApi = () => {
    const updateError = useErrorStore((state) => state.update);
    const disableError = useErrorStore((state) => state.disable);
    const get = async (url, onSuccess, onClientError, onServerError) => {
        try {
            const response = await axios.get(url);
            disableError();
            onSuccess && onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(err.message);
            }
        }
    }
    const post = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.post(url, body, config);
            disableError();
            onSuccess && onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(err.message);
            }
        }
    }
    const deleteReq = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.delete(url, {data:body, ...config});
            disableError();
            onSuccess && onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(err.message);
            }
        }
    }
    const put = async (url, body, onSuccess, onClientError, onServerError, config = {}) => {
        try {
            const response = await axios.put(url, body, config);
            disableError();
            onSuccess && onSuccess(response);
        } catch (err) {
            if(err.status < 500) {
                onClientError(err.response.data);
            } else {
                onServerError ? onServerError(err) : updateError(err.message);
            }
        }
    }
    return {get, post, deleteReq, put}
}

export default useApi;