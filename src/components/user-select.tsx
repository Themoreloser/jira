import type React from "react"
import { useUsers } from "../util/user"
import { Idselect } from "./id-select"

export const Userselect = (props:React.ComponentProps<typeof Idselect>)=>{
    const {data:users} = useUsers() 
    return <Idselect options={users || []} {...props}/>
}