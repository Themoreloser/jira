import { useParams } from "react-router"
import { useProject } from "../../util/project"
import { useUrlQueryParam } from "../../util/url"
import { useMemo } from "react"

 export const useProjectIdInUrl = ()=>{
    return Number(useParams().projectId)
 }

 export const useProjectInUrl = ()=> useProject(useProjectIdInUrl())

 export const useKanbanSearchParams = ()=> ({projectId:useProjectIdInUrl()})

 export const useKanbanQueryKey = ()=> ['kanbans',useKanbanSearchParams()]

 export const useTasksSearchParams = ()=> {
   const [] = useUrlQueryParam([
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
      name:partialMatchKey.name
   }),[projectId,param])
 }

 export const useTasksQueryKey = ()=> ['tasks',useTasksSearchParams()]