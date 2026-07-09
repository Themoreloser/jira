import { useParams } from "react-router"
import { useProject } from "../../util/project"
import { useUrlQueryParam } from "../../util/url"
import { useCallback, useMemo } from "react"
import { useTask } from "../../util/task"
import { useDebounce } from "../../util"

 export const useProjectIdInUrl = ()=>{
    return Number(useParams().projectId)
 }

 export const useProjectInUrl = ()=> useProject(useProjectIdInUrl())

 export const useKanbanSearchParams = ()=> {
   const projectId = useProjectIdInUrl() 
   const debouncedName = useDebounce(param.name,200)
   return useMemo(()=>({projectId,name:debouncedName}),[projectId])
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


export const useTasksModal = ()=>{
  const [{editingTaskId},setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const {data:editingTask,isLoading} = useTask(Number(editingTaskId))
  const startEdit = useCallback((id:number)=>{
    setEditingTaskId({editingTask:id})
  },[setEditingTaskId])
  const close = useCallback(()=>{
    setEditingTaskId({editingTask:''})
  },[setEditingTaskId])
  return {
    editingTask,
    editingTaskId,
    startEdit,
    close,
    isLoading
  }
}