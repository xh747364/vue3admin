import { AsyncConfig } from "@/interface/Request";
import http from "@/plugins/http"
import { AxiosError, AxiosResponse } from 'axios';

export const useAsyncRequest = <T>({ method, url, data, params }: AsyncConfig): Promise<any> => {

  const paramsData: AsyncConfig = {
    url: url,
    method: method,
  }

  if (method == "get") {
    paramsData['params'] = params
  } else {
    paramsData['data'] = data
  }
  return new Promise((resolve, reject) => {
    http.request(paramsData)
      .then((res: AxiosResponse) => {
        resolve(res)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })

}
