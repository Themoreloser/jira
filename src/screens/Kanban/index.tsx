import React from "react";
import { useDocumentTitle } from "../../util";
import { useKanbans } from "../../util/kanban";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import  { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../util/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = ()=>{
    useDocumentTitle('看板列表')

    const {data:currentProject} = useProjectInUrl()
    const {data:kanbans = [],isLoading:kanbanIsLoading} = useKanbans(useKanbanSearchParams())
    const {isLoading:taskIsLoading} = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading
    return <ScreenContainer>
         <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <ScrollWrapper>
        {isLoading ? <Spin size={'large'}/> :<ColumnContainer>
        {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}/>
    )
    }
    <CreateKanban />
    </ColumnContainer> }
    <TaskModal />
        </ScrollWrapper>
       </ScreenContainer>

}

export const ScrollWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

export const ColumnContainer = styled.div`
display:flex;
overflow-x:scroll;
align-items: flex-start;
min-width: 0;
`
