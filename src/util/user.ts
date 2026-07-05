import { useEffect } from "react"
import type { User } from "../types/user"
import { useAsync } from "./use-async"
import { useHttp } from "./http"
import { cleanObject } from "."

export const useUsers = (param?: Partial<User>)=>{
    const client = useHttp()
    const {run,...result} = useAsync<User[]>()
    useEffect(()=>{
        run( client('users',{data:cleanObject(param || {})}))
    },[param])

    return result
}