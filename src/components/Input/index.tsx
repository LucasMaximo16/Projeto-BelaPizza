import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import styles from './styles.module.sass'

export interface IinputProps {
    placeholder: string
    type:string
    name?:string
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export type IInputRequest  = {
    email: string
    password: string
}

export function Input({...props} : IinputProps){
    return(
        <input {...props}  className={styles.input}  />
    )
}