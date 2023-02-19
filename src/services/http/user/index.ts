import { ILoginData } from './types';
import { toastOptions } from "@/src/utils/toast/toastOptions";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import * as types from './types';
import api from "../../api";
import path from 'path';

async function login({ email, password }: types.ILoginData) {
    return api
        .post('/user/login', {
            email,
            password
        })
        .then((result) => {
            console.log(result, "oi bati aqui")
            setCookie(undefined, '@pizzaria:token', result.data.token, {
                maxAge: 60 * 60 * 1,
                path: '/'
            });
            return result.data.message;
        })
        .catch((error) => {
            console.log(error);
            if (error.response.data.message === 'User not found') {
                toast.error('Email ou Senha Invalido', { ...toastOptions, toastId: 'loginError' });
            }
            return null;
        })
}

async function createUser({name, email, password} : types.ICreateUser) {
    return (
        api.post('/user', {
            name,
            email,
            password
        }).then((result) => {
            console.log(result.data);
            toast.success("Cadastro efetivado com sucesso")
            return {
                status: result.status,
                message: { ...result.data.message }
            };
        })
            .catch((error) => {
                console.log(error);
                return {
                    status: error.response.status,
                    message: undefined
                };
            })
        // .then((result) => {
        //     setCookie(undefined, '@pizzaria:token', result.data.message, {
        //         maxAge:60 * 60 * 1,
        //         path: '/'
        //     })

        //     return result.data.message
        // })
        // .catch((error) => {
        //     if(error.response.data.message == 'Fail a Create User'){
        //         toast.error('Falha ao criar usuário', { ...toastOptions, toastId: 'createError' });
        //     }
        //     return null
        // })
    )
}

export default { login, createUser }