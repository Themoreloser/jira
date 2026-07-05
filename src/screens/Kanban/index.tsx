import React from "react";
import { useDocumentTitle } from "../../util";
import { useKanbans } from "../../util/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

export const KanbanScreen = ()=>{
    useDocumentTitle('看板列表')

    const {data:currentProject} = useProjectInUrl()
    const {data:kanbans} = useKanbans(useKanbanSearchParams())
    return <ColumnContainer>
        <h1>{currentProject?.name}看板</h1>
        {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}/>
)
    }
    </ColumnContainer>
    
}

const ColumnContainer = styled.div`
display:flex;
overflow:hidden;
margin-right:2rem;
`
