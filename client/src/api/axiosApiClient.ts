import axios from 'axios';
import { apiURL } from '../constants';
import { AppStore } from '../app/store';

export const axiosApiClient = axios.create({ baseURL: apiURL });

let appStore: AppStore;

export const injectStore = (store: AppStore) => {
    appStore = store;
}

axiosApiClient.interceptors.request.use((config) => {
    const token = appStore.getState().user.user?.token;
    if(token) {
       config.headers.set({ Authorization: token })
    }
    
    return config;
});