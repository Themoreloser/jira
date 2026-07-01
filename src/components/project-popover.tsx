import { List, Popover, Typography } from "antd";
import React from "react";
import { useProjects } from "../util/project";
import styled from "@emotion/styled";
import { Divider } from "antd"
import { ButtonNoPadding } from "./lib";
import { useAuth } from "../context/auth-context";

export const ProjectPopover = () => {
    const { openProjectModal } = useAuth()
    const { data: projects, retry } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContainerContent>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={"link"} onClick={openProjectModal}>创建项目</ButtonNoPadding>
    </ContainerContent>
    return <Popover placement={"bottom"} content={content} onOpenChange={() => retry()}>
        <span>项目</span>
    </Popover>
}

const ContainerContent = styled.div`
min-width:30rem;
`
