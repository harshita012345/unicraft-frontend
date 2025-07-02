import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export interface ResponseData {
  statusCode?: number;
  message?: string;
  data: [];
  filePath?: string;
}

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && (response.status === 200 || response.status === 201 || response.status === 204)) {
      return response.data;
    } else {
      if (response && (response.status === 401 || response.status === 408)) {
        toast.error('Session Expire.');
      } else if (response && response.status >= 500) {
        toast.error('Internal Server Error.', {
          toastId: 'error',
          autoClose: 2000
        });
      } else {
        toast.error(response.data?.message ?? 'Unknown error', {
          toastId: 'response_data',
          autoClose: 2000
        });
      }
      return Promise.reject(response);
    }
  },
  (error: AxiosError<ResponseData>) => {
    if (error.response?.data) {
      if (error.response.data.statusCode === 401 || error.response.data.statusCode === 408) {
        toast.error(error.response.data.message ?? 'Unauthorized', {
          toastId: 'nodata',
          autoClose: 1000
        });
      } else if (error.response.data.statusCode === 404) {
        if (!toast.isActive('nodata')) {
          toast.error(error.response.data.message ?? 'Not Found', {
            toastId: 'nodata',
            autoClose: 1000
          });
        } else {
          toast.update('nodata', {
            autoClose: 2000,
            render: error.response.data.message ?? 'Not Found',
            type: 'error'
          });
        }
      } else {
        toast.error(error.response.data.message ?? 'Unknown error', {
          toastId: 'error_response',
          autoClose: 2000
        });
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export const apiGet = async (url: string): Promise<string | AxiosResponse<any, any> | undefined> => {
    try {
    return await api.get(url);
  } catch (error: unknown) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      return error?.response?.data.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};

export const apiPost = async <T>(
  url: string,
  body: T,
  config?: any
): Promise<string | (AxiosResponse<any, any> & ResponseData) | undefined> => {
  try {
    return await api.post(url, body, config);
  } catch (error: unknown) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      return error?.response?.data.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};

export default api;