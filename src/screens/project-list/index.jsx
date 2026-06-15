import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useState,useEffect } from "react"
import React from "react"
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () =>{
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [users,setUsers] = useState([])
    useEffect(()=>{
        fetch(`${apiUrl}/proejects`).then(async response=> {
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=> {
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list} />
    </div>
}