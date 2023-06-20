import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://projeto-bela-pizza-backend.onrender.com',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    return api;

}