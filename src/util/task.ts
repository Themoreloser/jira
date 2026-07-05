import { useQuery } from "@tanstack/react-query"
import { useHttp } from "./http"
import type { Task } from "../types/task"

export const useTasks = (param?:Partial<Task>) =>{
    const client = useHttp()

    return useQuery<Task[]>({queryKey:['tasks',param],queryFn:()=>client('tasks',{data:param})})
}