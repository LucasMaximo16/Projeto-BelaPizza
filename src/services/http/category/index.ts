import { ICreateCategory } from './types';
import { toast } from "react-toastify";
import * as types from './types';
import api from "../../api";

async function cadastrar(name:types.ICreateCategory, authorization:string) : Promise<any | null> {
    return await api
        .post(`/category/`,
        name,
        {
            headers:{
                Authorization: authorization
            }
        }
    )
        .then((result) => {
            return result.data;
        })
        .catch((error) => {
            console.log(error);
            return null
        })
    }


async function getCategory(name: types.ICreateCategory, authorization: string): Promise<any | null> {
    return await api.get(`/category/`, {
        headers:{
            Authorization:authorization
        }
    })
    .then((result) => {
      return result.data 
    })
    .catch((err) => {
        console.log(err)
        return null
    });   
}

async function deleteCategory(category_id: string, authorization: string){
    return await api.delete("/category/" + category_id, {
        headers:{
            Authorization: authorization
        }
    })
    .then((result) => {
        return result.status
    })
    .catch((err) => {
        console.log(err)
        return err
    });
}
export default { cadastrar, getCategory, deleteCategory }