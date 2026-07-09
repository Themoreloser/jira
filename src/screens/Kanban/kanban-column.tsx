import type { Kanban } from "../../types/kanban";
import { useTasks } from "../../util/task";
import { useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../util/task-type";
import taskIcon from '../../assets/task.svg';
import bugIcon from '../../assets/bug.svg';
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./craete-task";
import { Mark } from "../../components/mark";

const iconMap: Record<string, string> = {
    '任务': taskIcon,
    'bug': bugIcon,
}

const TaskTypeIcon = ({id}:{id:number})=>{
    const {data:taskTypes = []} = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if(!name){
        return null
    }
    return <img src={iconMap[name] ?? taskIcon} />
}

const TaskCard = ()=>{
     const {data:allTasks = []} = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task=>task.kanbanId === kanban.id)
    const {startEdit} = useTasksModal()
    const {name:keyword} = useTasksSearchParams()
 return  tasks?.map(task => <Card onClick={()=>startEdit(task.id)} style={{marginBottom:'0.5rem',cursor:'pointer'}} key={task.id}>
           
            <Mark keyword={keyword} name={task.name}/>
            <TaskTypeIcon id={task.typeId}/>
        </Card>
            )}
export const KanbanColumn = ({kanban}:{kanban:Kanban})=>{
   
    return <Container>
         <h3>{kanban.name}</h3>
       <TasksContainer>
        
       {tasks?.map((task)=><TaskCard task={task}/>)}
            <CreateTask kanbanId={kanban.id}/>
       </TasksContainer>
    </Container>
}

export const Container = styled.div`
  min-width: 20rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  flex-shrink: 0;
`;

const TasksContainer = styled.div`
  overflow: auto;
  max-height: 60vh;

  ::-webkit-scrollbar {
    display: none;
  }
`;



