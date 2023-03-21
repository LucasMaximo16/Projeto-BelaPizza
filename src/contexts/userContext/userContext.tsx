import apiUser from '../../services/http/user/index'
import api from '../../services/api'
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "react";

export interface UserContextData { 
    user: UserProps
    isAuthenticaded:boolean
    updateUser: (newUser: UserProps) => void;
    // signIn(credentials : SignInProps) : Promise<void>; 
}

export interface UserProps{
    id: string | undefined;
    name: string
    email: string
    token: string|null  
}

export interface SignInProps{
    email: string
    password: string 
}

export interface UserProviderProps{
    children: ReactNode
}


export const UserContext = createContext({} as UserContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@pizzaria:token')
        Router.push('/')
    }
    catch{
        console.log("ERROR DESLOG")
    }
}

export function UserProvider({children} : UserProviderProps){
    const [user,setUser] = useState<UserProps>({
        id: undefined,
        name:'',
        email: '',
        token:null
    })
    const isAuthenticaded = !!user
    
    useEffect(() => {
        if (!user.token) {
            const cookies = parseCookies();
            const token = cookies['@pizzaria:token'];
            
            setUser({ ...user, token: token });
        }
    }, []);

    useEffect(() => {
        async function getUser() {
          if (user.name === '' && user.token !== null) {
            const getUser = await apiUser.getUser(user.token);
            setUser({ ...getUser, token: user.token });
            return getUser;
          }
        }
    
        getUser();
      },[]);
    

  const updateUser = useCallback((newUser: UserProps) => {
    setUser(newUser);
  }, [])
    
    return(
        <UserContext.Provider value ={{user, isAuthenticaded, updateUser}}>{children}</UserContext.Provider>
    )
}