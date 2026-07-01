import { List, Popover, Typography } from "antd";
import { useProjects } from "../util/project";
import styled from "@emotion/styled";
import { Divider } from "antd"
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "../screens/project-list/project-list-slice";

export const ProjectPopover = () => {
    const dispatch = useDispatch()
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
        <ButtonNoPadding type={"link"} onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</ButtonNoPadding>
    </ContainerContent>
    return <Popover placement={"bottom"} content={content} onOpenChange={() => retry()}>
        <span>项目</span>
    </Popover>
}

const ContainerContent = styled.div`
min-width:30rem;
`
