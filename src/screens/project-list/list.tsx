import { Table } from "antd";
import type { User } from "./search-list";
export interface Project{
  id:string;
  name:string;
  personId:string;
  pin?:boolean;
  organization:string
}
interface ListProps{
  list:Project[],
  users:User[]
}
export const List = ({ users, list }:ListProps) => {
  return <Table pagination={false} columns={[{
    title:'名称',
    dataIndex:'name',
    sorter:(a,b) => a.name.localeCompare(b.name)
  },{
    title:'负责人',
    render(value,project){
      return <span>
         {users.find((user) => String(user.id) === String(project.personId))?.name ||
                "未知"}
      </span>
    }
  }]} dataSource={list} />
}