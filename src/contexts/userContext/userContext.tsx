import { parseCookies } from "nookies";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "react";

export interface UserContextData { 
    user: UserProps
    isAuthenticaded:boolean
    updateUser: (newUser: UserProps) => void;
    // signIn(credentials : SignInProps) : Promise<void>; 
}

export interface UserProps{
    name: string
    email: string
    password: string
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

export function UserProvider({children} : UserProviderProps){
    const [user,setUser] = useState<UserProps>({
        name:'',
        email: '',
        password: '',
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

  const updateUser = useCallback((newUser: UserProps) => {
    setUser(newUser);
  }, [])

  console.log(user);
  

    return(
        <UserContext.Provider value ={{user, isAuthenticaded, updateUser}}>{children}</UserContext.Provider>
    )
}