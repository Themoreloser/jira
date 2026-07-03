import type { Project } from "../screens/project-list/list"
import { useHttp } from "./http"
import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query"
import { useEditConfig, useAddConfig, useDeleteConfig } from "./use-optimistic-options"

export const useProjects = (param?:Partial<Project>) =>{
    const client = useHttp()

    return useQuery({queryKey:['projects',param],queryFn:()=>client('project',{data:param})})
}
export const useEditProject = (queryKey:QueryKey)=>{
  const client = useHttp()
  return useMutation({
    mutationFn: (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
   ...useEditConfig(queryKey)
  })
}

export const useAddProject = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation({
        mutationFn: (params: Partial<Project>) => client('project', {
            data: params,
            method: 'POST'
        }),
       ...useAddConfig(queryKey)
    })
}

export const useDeleteProject = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation({
        mutationFn: ({id}:{id:number}) => client(`projects/${id}`, {
            method: 'POST'
        }),
       ...useDeleteConfig(queryKey)
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