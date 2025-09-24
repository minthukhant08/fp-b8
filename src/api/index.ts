import axios from "axios";

export const noAuthAxios = axios.create({
    baseURL: process.env.BASE_URL + "/api/"
})