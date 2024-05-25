import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const mockAxios = new MockAdapter(axios, { delayResponse: 500 });

export default axios;

export type ResponseConfig<T> = AxiosResponse<T>;
