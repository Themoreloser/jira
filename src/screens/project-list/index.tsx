import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useState } from "react"
import { useDebounce, useDocumentTitle } from "../../util"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "../../util/project"
import { useUsers } from "../../util/user"
import { Helmet } from "react-helmet"
import { useUrlQueryParam } from "../../util/url"
import { useProjectsSearchParams } from "./util"
export default function ProjectListScreen() {
   useDocumentTitle('项目列表')
    // 基本类型可以放到依赖里；组件状态可以放到依赖里；非组件状态，绝不可以放到依赖里
    const [param,setParam] = useProjectsSearchParams()
    const {isLoading,error,data:list} = useProjects(useDebounce(param,200))
    const {data:users} = useUsers()
    


    return <Container>
        
        <h1>项目列表</h1>
        <SearchPanel users={users ?? []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List  loading={isLoading} users={users ?? []} dataSource={list ?? []}/>
    </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
padding: 3.2rem;
`