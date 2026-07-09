import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query"
import type { Kanban } from "../types/kanban"
import { useHttp } from "./http"
import { useAddConfig } from "./use-optimistic-options"

export const useKanbans = (param?:Partial<Kanban>) =>{
    const client = useHttp()

    return useQuery<Kanban[]>({queryKey:['kanbans',param],queryFn:()=>client('kanbans',{data:param})})
}

export const useAddKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation({
        mutationFn: (params: Partial<Kanban>) => client('kanbans', {
            data: params,
            method: 'POST'
        }),
       ...useAddConfig(queryKey)
    })
}