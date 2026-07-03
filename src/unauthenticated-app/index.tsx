import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import Card from "antd/es/card/Card";
import styled from "@emotion/styled";
import { Button, Divider, Typography } from "antd";
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import logo from '../assets/logo.svg'
import Helmet from 'react-helmet'
import { useDocumentTitle } from "../util";
import { ErrorBox } from "../components/lib";

export const UnauthenticatedApp = ()=>{
    const [isRegister,setIsRegister] = useState(false)
    const [error,setError] = useState<Error | null>(null)
     useDocumentTitle('请登录或注册以继续')
    return  <Container>
        <Header>
            <img src={logo} alt="logo" />
        </Header>
        <Background/>
          <ShadowCard>
            <Title>
                {isRegister ? '请注册' : '请登录'}
            </Title>
            <ErrorBox error={error}></ErrorBox>
           
         {
            isRegister ? <RegisterScreen onError={setError}/> : <LoginScreen onError={setError} />
        }
        <Divider />
        <a onClick={()=>setIsRegister(!isRegister)}>{isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号' }</a>
        </ShadowCard>
    </Container>
}

export const LongButton = styled(Button)`
width:100%;
`

const Title = styled.h2`
margin-bottom:2.4rem;
color:rgb(94,108,132);
`

const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-position: left bottom, right bottom;
background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem), cover;
background-image: url(${left}), url(${right});
z-index: -1;
`

const Header = styled.header`
display: flex;
justify-content: center;
padding: 5rem 0;
width: 100%;
> img {
    width: 8rem;
}
`

const ShadowCard = styled(Card)`
width:40rem;
min-height:56rem;
padding:3.2rem 4rem;
border-radius:0.3rem;
box-sizing:border-box;
box-shadow:rgb(0,0,0,0.1) 0 0 10px;
text-align:center;
`

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
min-height:100vh;
`