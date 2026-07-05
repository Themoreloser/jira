import { useQuery } from "@tanstack/react-query"
import type { Kanban } from "../types/kanban"
import { useHttp } from "./http"

export const useKanbans = (param?:Partial<Kanban>) =>{
    const client = useHttp()

    return useQuery<Kanban[]>({queryKey:['kanbans',param],queryFn:()=>client('kanbans',{data:param})})
}