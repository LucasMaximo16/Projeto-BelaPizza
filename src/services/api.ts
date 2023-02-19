import axios,{ AxiosError} from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api

