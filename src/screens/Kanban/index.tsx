import React from "react";
import { useDocumentTitle } from "../../util";
import { useKanbans } from "../../util/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import  { ScreenContainer } from "../../components/lib";

export const KanbanScreen = ()=>{
    useDocumentTitle('看板列表')

    const {data:currentProject} = useProjectInUrl()
    const {data:kanbans} = useKanbans(useKanbanSearchParams())
    return <div>
       <ScreenContainer>
         <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <ColumnContainer>
        {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}/>
    )
    }
    </ColumnContainer>
       </ScreenContainer>
    </div>

}

const ColumnContainer = styled.div`
display:flex;
overflow-x:scroll;
flex:1;
`
