import { Input } from "@/src/components/Input";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles.module.sass"
import logo from "../../public/logo.svg"
import { Button } from "../components/Button";
import Link from "next/link";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import {useContext, useState} from "react"
import { loginInitialValues, loginSchema } from "../utils/Formik/LoginUser";
import apiUser from '../services/http/user/index'
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toast/toastOptions";
import { UserContext } from "../contexts/userContext/userContext";
import  Router from "next/router";
import { useUser } from "../hooks/useUser/useUsers";
import { GetServerSideProps } from "next";
import { canSSRGuest } from "../utils/SSR/canSSRGuest";

export default function Home(){

    const {updateUser} = useUser()

    const [isLogin,setIsLogin] = useState(false)
  
    async function handleSubmit(values: any){
        setIsLogin(true)
        const loginUser =  await apiUser.login({email: values.email, password: values.password})
          console.log(loginUser);
          
        if (loginUser !== null) {
            Router.push('/dashboard');
            setIsLogin(false)
        
            return toast.success("Usuário Logado")
        }
        setIsLogin(false)
        return toast.error("Usuário ou Senha Invalidos")
    }

    const formikProps = useFormik({
        initialValues: loginInitialValues,
        onSubmit: (values) => handleSubmit(values),
        validationSchema: loginSchema
    });


    return(
        <>    
        <Head>
            <title>Login User</title>
        </Head>
            <div className={styles.containerCenter}>
                <Image src={logo} alt="Logo Pizzaria"></Image>
                <div className={styles.login}>
                    <form onSubmit={formikProps.handleSubmit}>
                        <Input 
                            placeholder ="email"
                            type="text"
                            name="email"
                            onChange = {formikProps.handleChange}
                        />
                        
                        <Input 
                            placeholder={"password"}
                            type="password"
                            name="password"
                            onChange = {formikProps.handleChange}
                        />

                        <Button
                            type="submit"
                            loading={isLogin}
                        >
                            Acessar
                        </Button>
                    </form>
                    <Link href={"/signup"} >
                        <p className={styles.text}>Não possui conta ainda ? Cadastre-se </p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return{
        props: {}
    }
} )


