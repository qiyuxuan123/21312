import { http } from "./http";

interface ILogin {
    username: string;
    password: string;
}
export const loginApi = (data: ILogin) => {
    return http.post("/park/login", data)
}
export const menusApi = (data: any) => {
    return http.get("/park/sys/permision/all/tree", data)
}
interface IGetlist {
    page: string;
    pageSize: string;
    carNumber: string;
    personName: string;
    cardStatus: string;
}
export const getlistApi = (data: IGetlist) => {
    return http.get("/parking/card/list", data)
}
export const addlistApi = (data: any) => {
    return http.post("/parking/card", data)
}
export const dellistApi = (data: any) => {
    return http.delete(`/parking/card/${data.id}`)
}