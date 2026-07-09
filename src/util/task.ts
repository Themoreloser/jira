import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query"
import { useHttp } from "./http"
import type { Task } from "../types/task"
import { useAddConfig, useEditConfig } from "./use-optimistic-options"
import type { Project } from "../types/project"

export const useTasks = (param?:Partial<Task>) =>{
    const client = useHttp()

    return useQuery<Task[]>({queryKey:['tasks',param],queryFn:()=>client('tasks',{data:param})})
}
export const useAddTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation({
        mutationFn: (params: Partial<Task>) => client('tasks', {
            data: params,
            method: 'POST'
        }),
       ...useAddConfig(queryKey)
    })
}

export const useTask = (id?:number) =>{
    const client = useHttp()
    return useQuery<Project>({
        queryKey:['task',{id}],
        queryFn:()=>client(`tasks/${id}`),
        enabled:Boolean(id)
    })
}

export const useEditTask = (queryKey:QueryKey)=>{
  const client = useHttp()
  return useMutation({
    mutationFn: (params: Partial<Task>) => client(`tasks/${params.id}`, {
      method: 'PATCH',
      data: params
    }),
   ...useEditConfig(queryKey)
  })
}