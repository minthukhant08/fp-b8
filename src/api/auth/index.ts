import { AxiosResponse } from "axios"
import { noAuthAxios } from ".."
import routes from "./routes"
const API = {
    login: (payload: LoginInput) => noAuthAxios.post<ResponseBody<UserResponse>>(routes.login, payload),
}

export default API