import { SearchPanel } from "./search-list"
import { List } from "./list"
import type { Project } from "./list"
import type { User } from "./search-list"
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from "../../util"
import { useHttp } from "../../util/http"
import styled from "@emotion/styled"
export default function ProjectListScreen() {
    const [list,setList] = useState<Project[]>([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [users,setUsers] = useState<User[]>([])
    const debouncedParam = useDebounce(param,500)
    const client = useHttp()
    useEffect(()=>{
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])

    useMount(()=>{
        client('users').then(setUsers)
    })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
padding: 3.2rem
`