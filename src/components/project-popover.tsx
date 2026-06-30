import { List,Popover ,Typography} from "antd";
import React from "react";
import { useProjects } from "../util/project";
import styled from "@emotion/styled";


export const ProjectPopover = ()=>{
    const {data:projects,retry} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContainerContent>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project =><List.Item key={project.id}>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
    </ContainerContent>
    return <Popover placement={"bottom"} content={content} onOpenChange={()=>retry()}>
       <span>项目</span>
    </Popover>
}

const ContainerContent = styled.div`
min-width:30rem;
`