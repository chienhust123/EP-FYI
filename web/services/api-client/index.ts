<<<<<<< Updated upstream
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
=======
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const mockAxios = new MockAdapter(axios, { delayResponse: 500 });
>>>>>>> Stashed changes

export default axios

export type ResponseConfig<T> = AxiosResponse<T>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
