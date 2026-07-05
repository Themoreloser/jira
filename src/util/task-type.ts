import { useQuery } from "@tanstack/react-query"
import { useHttp } from "./http"
import type { TaskType } from "../types/task-type"

export const useTaskTypes = () =>{
    const client = useHttp()

    return useQuery<TaskType[]>({queryKey:['taskTypes'],queryFn:()=>client('taskTypes')})
}