import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useState,useEffect } from "react"
import React from "react"
import { cleanObject, useMount,useDebounce } from "../../util"
import qs from "qs"
const apiUrl = process.env.REACT_APP_API_URL
export default function ProjectListScreen() {
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [users,setUsers] = useState([])
    const debouncedParam = useDebounce(param,500)
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response=> {
            if(response.ok){
                setList(await response.json())
            }
        })
    },[debouncedParam])
    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async response=> {
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list} />
    </div>
}