import { useCallback, useEffect } from "react"
import { cleanObject } from "."
import type { Project } from "../screens/project-list/list"
import { useAsync } from "./use-async"
import { useHttp } from "./http"
import type { User } from "../screens/project-list/search-list"

export const useProjects = (param?:Partial<Project>) =>{
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()

    const fetchProjects =useCallback( ()=>client('projects',{data:cleanObject(param || {})}),[client,param])
    useEffect(()=>{
        run( fetchProjects(),{
            retry:fetchProjects
        })
    },[param,run,fetchProjects])

    return result
}

export const useEditProject = ()=>{
    const {run,...asyncRsault} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) =>{
        return run(client(`project/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    } 
    return {
        mutate,
        ...asyncRsault
    }
}

export const useAddProject = ()=>{
    const {run,...asyncRsault} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) =>{
        return run(client(`project/${params.id}`,{
            data:params,
            method:'POST'
        }))
    } 
    return {
        mutate,
        ...asyncRsault
    }
}