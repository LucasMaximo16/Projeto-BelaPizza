import axios,{ AxiosError} from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api

export function setupAPIClient(ctx:any) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@pizzaria:token']}`
        }
    })

    return api;
}
