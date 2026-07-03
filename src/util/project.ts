import type { Project } from "../screens/project-list/list"
import { useHttp } from "./http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProjects = (param?:Partial<Project>) =>{
    const client = useHttp()

    return useQuery({queryKey:['projects',param],queryFn:()=>client('project',{data:param})})
}
export const useEditProject = ()=>{
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(params:Partial<Project>)=>client(`projects/${params.id}`,{
            method:'PATCH',
            data:params
        }),
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['projects']})
    })
}

export const useAddProject = () => {
    const queryClient = useQueryClient()
    const client = useHttp()
    return useMutation({
        mutationFn: (params: Partial<Project>) => client('project', {
            data: params,
            method: 'POST'
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
    })
}

export const useProject = (id?:number) =>{
    const client = useHttp()
    return useQuery<Project>({
        queryKey:['project',{id}],
        queryFn:()=>client(`projects/${id}`),
        enabled:Boolean(id)
    })
}