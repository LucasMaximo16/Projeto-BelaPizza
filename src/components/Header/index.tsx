import { signOut, UserContext } from "@/src/contexts/userContext/userContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";;
import logo from "../../../public/logo.svg"
import styles from "./styles.module.sass"

import { FiLogOut } from 'react-icons/fi'

export function Header(){

    const {user} = useContext(UserContext)

    return(
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href={"/dashboard"}>
                        <Image src={logo} width={190} height={60} alt="Logo Pizzaria"></Image>
                    </Link>

                    <nav>
                        <Link href={'/category'}>
                            <p>Categoria</p>
                        </Link>

                        <Link href={'/product'}>
                            <p>Produtos</p>
                        </Link>

                        <button onClick={signOut}>
                            <FiLogOut color="#FFF" size={24}/>
                        </button>
                    </nav>
                </div>

            </div>
        </header>
    )
}