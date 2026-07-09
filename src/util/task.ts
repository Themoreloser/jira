import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query"
import { useHttp } from "./http"
import type { Task } from "../types/task"
import { useAddConfig } from "./use-optimistic-options"

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