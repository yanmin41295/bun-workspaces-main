import axios from "axios";

export const fileApi = axios.create({
    baseURL: '/api/file'
})
fileApi.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export namespace FileManagerApi {

}