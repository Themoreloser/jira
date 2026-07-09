import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { Project } from "../types/project";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any[]) => any[],
  onSuccess?: (data: any, old: any[]) => any[]
) => {
    const queryClient = useQueryClient()
    return{
    async onSuccess(data: any) {
      if (onSuccess) {
        queryClient.setQueryData(queryKey, (old?: any[]) => {
          return onSuccess(data, old || [])
        })
      }
    },
    async onMutate(target:any) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey,(old?:any[])=>{
        return callback(target,old)
      })
      return {previousItems}
    },
    onError(error:any,newItem:any,context:any){
        queryClient.setQueryData(queryKey,(context as{previousItems:Project[]}).previousItems)
    }
    }
}

export const useDeleteConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old) => old?.map(item => item.id === target.id ? {...item,...target} : item) || [])
export const useAddConfig = (queryKey:QueryKey) => useConfig(
  queryKey,
  // onMutate: 乐观添加（带临时 ID）
  (target, old) => {
    const tempId = Date.now()
    return [...(old || []), { ...target, id: tempId }]
  },
  // onSuccess: 用服务端返回的真实数据替换数组最后一项
  (data, old) => {
    const result = [...old]
    result[result.length - 1] = data
    return result
  }
)