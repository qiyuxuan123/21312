import { MyAxios } from "./MyAxios";
export const http = new MyAxios({
    baseURL: '/api',
    timeout: 5000,
})

