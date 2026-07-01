import * as auth from '../auth-provider'
import React, { useCallback, type ReactNode } from 'react';
import { useMount } from '../util';
import { http } from '../util/http';
import { FullPageError, FullPageloading } from '../components/lib';
import { useAsync } from '../util/use-async';
import * as authStore from '../store/auth.slice'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
export interface AuthForm {
  username: string,
  password: string
}

export const bootstrapUser = async ()=>{
  let user = null
  const token = auth.getToken()
  if(token){
    const data = await http('me',{token})
    user = data.user
  }
  return user
}



export const AuthProvider = ({children}:{children:ReactNode}) => {
  const {run, isLoading, isError} = useAsync()
 const dispatch = useDispatch<AppDispatch>()
  useMount(()=>{
    run(dispatch(authStore.bootstrap()))
  })

  if(isLoading){
     return <FullPageloading/>
  }
  if(isError){
    return <FullPageError/>
  }
  return <div>
   {children}
  </div>

}
export const useAuth = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form:AuthForm)=>dispatch(authStore.login(form)),[dispatch])
    const register = useCallback((form:AuthForm)=>dispatch(authStore.register(form)),[dispatch])
    const logout = useCallback(()=>dispatch(authStore.logout()),[dispatch])

    return {
      user,
      login,
      register,
      logout
    }
}