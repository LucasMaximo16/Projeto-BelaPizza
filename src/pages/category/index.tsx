import { Header } from "@/src/components/Header";
import styles from "./styles.module.sass"
import Head from "next/head";
import { useFormik } from "formik";
import { categoryInitialValues, categorySchema } from "@/src/utils/Formik/Category";
import apiCategory from "../../services/http/category/index"
import { useUser } from "@/src/hooks/useUser/useUsers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/src/utils/SSR/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import {BsTrash} from "react-icons/bs"


interface ICategoryProps {
    categoryList: ICategory[]
}

interface ICategory {
    name:string
}


export default function Category({categoryList} : ICategoryProps){
    const {authorization} = useUser()
    const [name, setName] = useState()

    const [category, setCategory] = useState(categoryList || [])

    async function handleSubmit(value:any){
        const createCategory = await apiCategory.cadastrar({name : value.name}, authorization)
        
        if(createCategory){
            toast.success("Sucesso ao cadastrar a cateogoria")
        }else{
            toast.error("Erro ao cadastrar a categoria")
        }
    }

    const formikProps = useFormik({
        initialValues: categoryInitialValues,
        onSubmit: (value) => handleSubmit(value),
        validationSchema: categorySchema
    })


    return(
        <>
            <Head>
                <title>Nova categoria - Sujeito Pizzaria </title>
            </Head>
            <div>
                <Header/>
                
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>

                    <form onSubmit={formikProps.handleSubmit} className={styles.form}>
                       <input 
                        type="text" 
                        name="name"
                        placeholder="Digite o nome da categoria"
                        onChange={formikProps.handleChange} 
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>

                {
                    category.map((item) => (
                        <div className={styles.categoryContainer}>
                            <span className={styles.categoryList}>
                                {item.name}
                               <div className={styles.delete}>
                                 <BsTrash size={25}/>
                               </div>
                            </span>
                          
                        </div>
                    ))
                }
            </div>
        </>
    )
}

 export const getServerSideProps = canSSRAuth(async(ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')
    
    return{
            props:{
                categoryList: response.data
            }
        }
    })