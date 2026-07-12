import styled from "@emotion/styled"
import { useAuth } from "./context/auth-context"
import ProjectListScreen from "./screens/project-list"
import { ButtonNoPadding, Row } from "./components/lib"
import SoftwareLogo from './assets/software-logo.svg?react'
import { Dropdown,Button } from "antd"
import { Navigate,Route,Routes } from "react-router"
import {BrowserRouter as Router} from "react-router-dom"
import { ProjectScreen } from "./screens/project"
import { resetRoute } from "./util"
import { ProjectModel } from "./screens/project-list/project-model"
import { ProjectPopover } from "./components/project-popover"
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = ()=>{
<<<<<<< HEAD
    
return <div>
     <Router>
    <PageHeader projectButton={
        <ButtonNoPadding onClick={()=>setProjectModelOpen(true)}
        type={'link'}>创建项目</ButtonNoPadding>} />
       
=======
return <div>
    <PageHeader />
>>>>>>> redux-toolkit
    <Main>
    
    <Routes>
        <Route path={'/'} element={<Navigate to={'/projects'}/>}></Route>
        <Route path={'projects'} element={<ProjectListScreen />}></Route>
        <Route path={'projects/:projectId/*'} element={<ProjectScreen /> }></Route>
    </Routes>
   
    </Main>
    <ProjectModel />
<<<<<<< HEAD
     </Router>
=======
>>>>>>> redux-toolkit
    </div>
}

const PageHeader = ()=>{

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding style={{padding:0}} type={'link'} onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,138,255)'}/>
            </ButtonNoPadding>
            <ProjectPopover />
            <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
         <User />
        </HeaderRight>
    </Header>
}
    const User = ()=>{
        const {logout,user} = useAuth()
        return  <Dropdown menu={{items:[{key:'logout',label:<Button type={"link"} onClick={logout}>登出</Button>}]}}>
            <a onClick={e => e.preventDefault()}>
                Hi,{user?.name}
            </a>
          </Dropdown>
    }

const Main = styled.main`
display:flex;
overflow:hidden;
`

const Header = styled(Row)`
padding:3.2rem;
box-shadow:0 0 5px 0 rgb(0,0,0,0.1);
z-index:1
`

const HeaderLeft = styled(Row)``


const HeaderRight = styled.div``
