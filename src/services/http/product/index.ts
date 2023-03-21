import { toast } from 'react-toastify';
import api from '../../api';
import * as types from './types'
import { IProductProps } from './types';

async function create(data: types.IProductProps, authorization:string) {
    return api.post(`/product`,{...data},{
        headers:{
            Authorization:authorization
        }
    })
    .then((result)=>{
        toast.success('Sucesso')
        return result.data
    })
    .catch((err)=> {
        console.log(err);
        return toast.error('Erro ao cadastrar')
    })
}

export default {create}