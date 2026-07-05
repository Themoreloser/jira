import { useParams } from "react-router"
import { useProject } from "../../util/project"

 export const useProjectIdInUrl = ()=>{
    return Number(useParams().projectId)
 }

 export const useProjectInUrl = ()=> useProject(useProjectIdInUrl())

 export const useKanbanSearchParams = ()=> ({projectId:useProjectIdInUrl()})

 export const useKanbanQueryKey = ()=> ['kanbans',useKanbanSearchParams()]

 export const useTasksSearchParams = ()=> ({projectId:useProjectIdInUrl()})

 export const useTasksQueryKey = ()=> ['tasks',useTasksSearchParams()]