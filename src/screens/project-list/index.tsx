import { SearchPanel } from "./search-list"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "../../util"
import styled from "@emotion/styled"
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib"
import { useProjects } from "../../util/project"
import { useUsers } from "../../util/user"
import { useProjectModal, useProjectsSearchParams } from "./util"

export default function ProjectListScreen() {
   useDocumentTitle('项目列表')
    // 基本类型可以放到依赖里；组件状态可以放到依赖里；非组件状态，绝不可以放到依赖里
    const [param,setParam] = useProjectsSearchParams()
    const {isLoading,error,data:list} = useProjects(useDebounce(param,200))
    const {data:users} = useUsers()
    const {open} = useProjectModal()


    return <Container>
        <Row between={true}>
         <h1>项目列表</h1>
          <ButtonNoPadding onClick={open}
        type={'link'}>创建项目</ButtonNoPadding>
        </Row>
        <SearchPanel users={users ?? []} param={param} setParam={setParam}/>
        <ErrorBox error={error}></ErrorBox>
        <List  loading={isLoading} users={users ?? []} dataSource={list ?? []}/>
    </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
padding: 3.2rem;
width: 100%;
`