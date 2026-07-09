import type React from "react"
import { useUsers } from "../util/user"
import { Idselect } from "./id-select"
import { useTaskTypes } from "../util/task-type"

export const TaskTypeSelect = (props:React.ComponentProps<typeof Idselect>)=>{
    const {data:taskTypes} = useTaskTypes() 
    return <Idselect options={taskTypes || []} {...props}/>
}