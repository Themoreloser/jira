import { Button, Divider, List,Popover ,Typography} from "antd";
import React from "react";
import { useProjects } from "../util/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import type { JSX } from "@emotion/react/jsx-runtime";


export const ProjectPopover = (props:{projectButton:JSX.Element})=>{
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
        <Divider />
       {props.projectButton}
    </ContainerContent>
    return <Popover placement={"bottom"} content={content} onOpenChange={()=>retry()}>
       <span>项目</span>
    </Popover>
}

const ContainerContent = styled.div`
min-width:30rem;
`