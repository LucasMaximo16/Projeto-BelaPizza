
import { Header } from '@/src/components/Header'
import { useUser } from '@/src/hooks/useUser/useUsers'
import api, { setupAPIClient } from '@/src/services/api'
import { canSSRAuth } from '@/src/utils/SSR/canSSRAuth'
import Head from 'next/head'

import { ChangeEvent, FormEvent, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import styles from './styles.module.sass'

import apiProduct from '../../services/http/product'
import { useFormik } from 'formik'
import { productInitialValues, productSchema } from '@/src/utils/Formik/Product'
import { toast } from 'react-toastify'


interface IItemCategoryProps{
    id: string,
    name: string
}

interface ICategoryListProps{
    categoryList: IItemCategoryProps[]
}

export default function Product({categoryList}:ICategoryListProps){

    const [avatarUrl, setAvatarUrl] = useState('')

    const {authorization} = useUser()

    const[categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleChangeCategory(event:any){
        setCategorySelected(event.target.value)
    }

    const getBase64 = (banner:File) => new Promise((resolve,rejects) => {
        const reader = new FileReader();
        reader.readAsDataURL(banner);
        reader.onload = () => resolve(reader.result) 
        reader.onerror = error => rejects(error)
})
    

    async function handleFile(e:ChangeEvent<HTMLInputElement>){
        
        if(!e.target.files){
            return console.error("IMPOSSIVEL")    
        }    
        const image = e.target.files[0]
        console.log(image);

        console.log(e.target.files[0]);
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            const toBase64 = await getBase64(image) as string
            formikProps.setFieldValue('image', toBase64)
            setAvatarUrl(URL.createObjectURL(image))
        }
    }

    async function handleSubmit(value:any){
        console.log("bati aqui");
        
        const response = await apiProduct.create({name: value.name ,price:value.price, description: value.description, banner: value.image, category_id: categories[categorySelected].id },  authorization)
        
    
        if(response){
            toast.success("Sucesso ao cadastrar a cateogoria")
            return response
        }else{
            toast.error("Erro ao cadastrar a categoria")
        }
    }
    
    const formikProps = useFormik({
        initialValues: productInitialValues,
        onSubmit: (values) => handleSubmit(values),
        validationSchema: productSchema
    })
    console.log(formikProps.errors)
    
    return (
        <>
            <Head>
                <title> Novo Produto - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form
                    onSubmit={formikProps.handleSubmit} 
                    className={styles.form}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color="#FFF"/>
                            </span>

                            <input name='image' type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && ( 
                                <img 
                                className={styles.preview}
                                src={formikProps.values.image || undefined} 
                                alt="LOGO DA IMAGEM"
                                width={280}
                                height={280} 
                                />
                            )}
                           
                        </label>

                        <select name='category_id' value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((item,index) => {
                                    return(
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input 
                        name='name'
                        className={styles.input}
                        type="text" 
                        placeholder='Nome do produto'
                        onChange={formikProps.handleChange}
                        />

                        <input
                        name='price' 
                        className={styles.input}
                        type="text" 
                        placeholder='Preço do Produto'
                        onChange={formikProps.handleChange}
                        />

                        <textarea
                        name='description'
                        placeholder='Desecreva seu produto'
                        className={styles.input}
                        onChange={formikProps.handleChange}
                        />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>

                </main>
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

    