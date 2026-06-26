import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useState } from "react"
import { useDebounce, useDocumentTitle } from "../../util"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "../../util/project"
import { useUsers } from "../../util/user"
import { Helmet } from "react-helmet"
export default function ProjectListScreen() {
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const debouncedParam = useDebounce(param,500)
    const {isLoading,error,data:list} = useProjects(debouncedParam)
    const {data:users} = useUsers()
    useDocumentTitle('项目列表')
    return <Container>
        
        <h1>项目列表</h1>
        <SearchPanel users={users ?? []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List  loading={isLoading} users={users ?? []} dataSource={list ?? []}/>
    </Container>
}

const Container = styled.div`
padding: 3.2rem;
`