import axios,{ AxiosError} from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: 'https://projeto-bela-pizza-backend.onrender.com'
});

export default api

export function setupAPIClient(ctx:any) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://projeto-bela-pizza-backend.onrender.com',
        headers: {
            Authorization: `Bearer ${cookies['@pizzaria:token']}`
        }
    })

    return api;
}
