import { apiGet, apiPost } from './axiosInterceptor';

export const getCompanies = (params?: any) => apiGet(`/company/list${params ? `?${new URLSearchParams(params).toString()}` : ''}`);
export const addCompany = (data: { companyName: string; email: string; websiteUrl: string; companyInfo: string; phone: string; }) => apiPost('/company/create', data);