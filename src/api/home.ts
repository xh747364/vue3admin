import http from "@/plugins/http"
import { AxiosError, AxiosResponse } from 'axios';

//  获取主页数据
export const GetPosts = (): Promise<Service.PostsList> => {
    return new Promise((resolve, reject)=>{
        http.request({
            url: '/apis/posts',
            method: 'get'
        })
        .then((res: AxiosResponse) => {
            resolve(res.data)
        })
        .catch((err: AxiosError) => reject(err))
    })
}
