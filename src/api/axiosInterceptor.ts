import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.get<T>(url, config);
    return res.data;
};

export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.post<T>(url, data, config);
    return res.data;
};

export const apiPatch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.patch<T>(url, data, config);
    return res.data;
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.delete<T>(url, config);
    return res.data;
};

export default api;