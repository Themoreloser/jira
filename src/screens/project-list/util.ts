import { useMemo } from "react"
import { useUrlQueryParam } from "../../util/url"
import { useProject } from "../../util/project"


export const useProjectsSearchParams = ()=> {
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    return [
        useMemo(()=>({...param,personId:Number(param.personId) || undefined}),[param]),
        setParam
    ] as const
}

export const useProjectModal = ()=>{
    const [{projectCreate,editingProjectId},setUrlParams] = useUrlQueryParam([
        'projectCreate','editingProjectId'
    ])

    const {data:editingProject,isLoading} = useProject(Number(editingProjectId))

    const open = ()=> setUrlParams({projectCreate:true})
    const close = ()=> {
        setUrlParams({projectCreate:undefined,editingProjectId:undefined})
    }
    const startEdit = (id:number) => setUrlParams({editingProjectId:id})
    return{
        projectModalOpen:projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
        editingProjectId
    }
}