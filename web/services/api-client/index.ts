import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default <TData, TRequest>(config: AxiosRequestConfig<any>) => axios<TData, AxiosResponse<TData>, TRequest>(config)

export type ResponseConfig<T> = AxiosResponse<T>

