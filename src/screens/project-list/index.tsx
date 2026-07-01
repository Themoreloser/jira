import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "../../util"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "../../util/project"
import { useUsers } from "../../util/user"
import { useProjectsSearchParams } from "./util"
import { Row } from '../../components/lib'
import { Button } from 'antd'
import { useAuth } from "../../context/auth-context"

export default function ProjectListScreen() {
    const { openProjectModal } = useAuth()
    useDocumentTitle('项目列表')
    // 基本类型可以放到依赖里；组件状态可以放到依赖里；非组件状态，绝不可以放到依赖里
    const [param,setParam] = useProjectsSearchParams()
    const {isLoading,error,data:list,retry} = useProjects(useDebounce(param,200))
    const {data:users} = useUsers()

    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <Button onClick={openProjectModal}>创建项目</Button>
        </Row>
        <SearchPanel users={users ?? []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List refresh={retry} loading={isLoading} users={users ?? []} dataSource={list ?? []}/>
    </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
padding: 3.2rem;
`
