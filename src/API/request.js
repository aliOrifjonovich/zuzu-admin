import axios from "axios";

export const requestData = axios.create({
    baseURL:"https://647a3c8ba455e257fa647f54.mockapi.io/admin/",
})