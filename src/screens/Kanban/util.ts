import { useParams } from "react-router"
import { useProject } from "../../util/project"
import { useUrlQueryParam } from "../../util/url"
import { useMemo } from "react"

 export const useProjectIdInUrl = ()=>{
    return Number(useParams().projectId)
 }

 export const useProjectInUrl = ()=> useProject(useProjectIdInUrl())

 export const useKanbanSearchParams = ()=> {
   const projectId = useProjectIdInUrl()
   return useMemo(()=>({projectId}),[projectId])
 }

 export const useKanbanQueryKey = ()=> {
   const params = useKanbanSearchParams()
   return useMemo(()=>['kanbans',params],[params])
 }

 export const useTasksSearchParams = ()=> {
   const [param,setParam] = useUrlQueryParam([
      'name',
      'typeId',
      'processorId',
      'tagId'
   ])
   const projectId = useProjectIdInUrl()
   return useMemo(()=>({
      projectId,
      typeId:Number(param.typeId) || undefined,
      processorId:Number(param.processorId) || undefined,
      tagId:Number(param.tagId) || undefined,
      name:param.name
   }),[projectId,param])
 }

 export const useTasksQueryKey = ()=> {
   const params = useTasksSearchParams()
   return useMemo(()=>['tasks',params],[params])
 }