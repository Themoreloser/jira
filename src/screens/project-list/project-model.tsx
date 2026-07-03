import React, { useEffect } from "react"
import { Drawer ,Button, Spin, Form, Input} from "antd"
import { useProjectModal } from "./util"
import  { Userselect } from "../../components/user-select"
import { useAddProject, useEditProject } from "../../util/project"
import { useForm } from "antd/es/form/Form"
import  { ErrorBox } from "../../components/lib"
import styled from "@emotion/styled"

export const ProjectModel = ()=>{
    const {close,projectModalOpen,editingProject,isLoading,editingProjectId} = useProjectModal()
    const title = editingProjectId ? '编辑项目' : '创建项目'
    const useMutateProject = editingProjectId ? useEditProject : useAddProject
    const {mutateAsync,error,isLoading:mutateloading} = useMutateProject()
    
    const [form] = useForm()
    const onFinish = (values:any)=>{
        mutateAsync({id:editingProjectId,...editingProject,...values}).then(()=>{
            form.resetFields()
            close()
        })
    }

useEffect(()=>{
    form.setFieldsValue(editingProject)
},[editingProject,form])

    return <Drawer onClose={close} open = {projectModalOpen} size={'100%'}>
       <Container>
         {
            isLoading ? <Spin size={'large'}/> : <>
            <h1>{title}</h1>
            <ErrorBox error={error}></ErrorBox>
            <Form form={form} layout={'vertical'} style={{width:'40rem'}} onFinish={onFinish}>
            <Form.Item label={'名称'} name={'name'} rules={[{required:true,message:'请输入项目名'}]}>
            <Input placeholder={'请输入项目名称'}></Input>
            </Form.Item>
            <Form.Item label={'部门'} name={'organization'} rules={[{required:true,message:'请输入部门名'}]}>
            <Input placeholder={'请输入部门名称'}></Input>
            </Form.Item>
            <Form.Item label={'负责人'} name={'personId'} >
            <Userselect defaultOptionName={'负责人'}></Userselect>
            </Form.Item>
            <Form.Item >
            <Button loading={mutateloading} type={'primary'} htmlType={'submit'}>
                提交
            </Button>
            </Form.Item>
            </Form>
            </>
        }
       </Container>
       
    </Drawer>
}

const Container = styled.div`
height : 80vh;
display : flex;
flex-direction:column;
justify-content : center;
align-items :center;
` 