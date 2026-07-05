import * as auth from '../auth-provider'
import React, { useState, type ReactNode } from 'react';
import type { User } from "../types/user";
import { useMount } from '../util';
import { http } from '../util/http';
import { FullPageError, FullPageloading } from '../components/lib';
import { useAsync } from '../util/use-async';
import { useQueryClient } from '@tanstack/react-query';
interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async ()=>{
  let user = null
  const token = auth.getToken()
  if(token){
    const data = await http('me',{token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
    user:User|null,
    register:(form:AuthForm) =>Promise<void>,
    login:(form:AuthForm) =>Promise<void>,
    logout:() =>Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const {run, isLoading, isError} = useAsync<User | null>()

  const queryClient = useQueryClient()
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  })
  useMount(()=>{
    run(bootstrapUser().then(user => {
      setUser(user)
      return user
    }))
  })

  if(isLoading){
     return <FullPageloading/>
  }
  if(isError){
    return <FullPageError/>
  }
  return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>
}
export const useAuth = ()=>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}