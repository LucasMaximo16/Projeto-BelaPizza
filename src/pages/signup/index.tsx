import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import apiUser from "../../services/http/user/index"
import Image from "next/image";
import logo from "../../../public/logo.svg"
import Head from "next/head";
import styles from "./sytles.module.sass"
import Link from "next/link";
import { useState } from "react";
import { loginInitialValues, loginSchema } from "@/src/utils/Formik/LoginUser";
import { useFormik } from "formik";
import { toastOptions } from "@/src/utils/toast/toastOptions";
import { toast } from "react-toastify";
import  Router from "next/router";

export default function SignUp(){

    const [isLogin,setIsLogin] = useState(false)

    async function handleSubmit(values : any) {
        const register = await apiUser.createUser({name:values.name, email:values.email, password:values.password})
        console.log(values);
        console.log(register, "register");

        if(register.status === 200){
            Router.push("/")
        }

        if(register.status === 400){
            toast.error('Todos os campos devem ser preenchidos');
        }
         return register
    }

    const formikProps = useFormik({
        initialValues: loginInitialValues,
        onSubmit: (values) => handleSubmit(values),
        validationSchema: loginSchema
    });
    
    return(
        <>
            <Head>
                <title>Cadastre-se</title>
            </Head>

            <div className={styles.containerCenter}>
                <Image src={logo} alt="Logo Pizzaria"></Image>
                <div className={styles.cadastre}>
                  <form onSubmit={formikProps.handleSubmit}>
                    <Input onChange={formikProps.handleChange} placeholder={"name"} type={"text"} name={"name"}/>

                    <Input onChange={formikProps.handleChange} placeholder={"e-mail"} type={"Email"} name={"email"}/>

                    <Input onChange={formikProps.handleChange} placeholder={"password"} type={"password"} name={"password"}/>

                    {/* <Input onChange={formikProps.handleChange} placeholder={"confirm your password"} type={"password"}/> */}

                    <Button
                        type="submit"
                        loading={false}
                    >
                        Registre-se
                    </Button>
                  </form>

                  <Link href={"/"} >
                        <p className={styles.text}>Ja possui conta ? Faça seu login</p>
                    </Link>
                </div>

            </div>
        </>
    )
}