import { useEffect } from "react"
import { cleanObject } from "."
import type { Project } from "../screens/project-list/list"
import { useAsync } from "./use-async"
import { useHttp } from "./http"
import type { User } from "../screens/project-list/search-list"

export const useProjects = (param?:Partial<Project>) =>{
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    useEffect(()=>{
        run( client('projects',{data:cleanObject(param || {})}))
    },[param])

    return result
}