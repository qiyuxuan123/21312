import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";


export class MyAxios {
    serve: AxiosInstance;
    constructor(config?: CreateAxiosDefaults<any> | undefined) {
        this.serve = axios.create(config);
        this.interceptors();
    }
    interceptors() {
        // 添加请求拦截器
        this.serve.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            const token = localStorage.getItem("token");
            config.headers.Authorization = `${token}`;
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        this.serve.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response.data;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    http<T = any>(url: string, method: string, data?: T) {
        return this.serve.request({ url, method, params: data });
    }
    get<T = any>(url: string, data?: T) {
        return this.serve.get(url, { params: data });
    }
    post<T = any>(url: string, data?: T) {
        return this.serve.post(url, data);
    }
    put<T = any>(url: string, data?: T) {
        return this.serve.put(url, data);
    }
    delete<T = any>(url: string, data?: T) {
        return this.serve.delete(url, { params: data });
    }
}
