import { Table } from "antd";
import type { User } from "./search-list";
import dayjs from "dayjs";
export interface Project{
  id:string;
  name:string;
  personId:string;
  pin?:boolean;
  organization:string;
  created:number
}
interface ListProps{
  loading?:boolean,
  dataSource:Project[],
  users:User[]
}
export const List = ({ loading, users, dataSource }:ListProps) => {
  return <Table<Project> loading={loading} pagination={false} columns={[
    {
    title:'名称',
    dataIndex:'name',
    sorter:(a,b) => a.name.localeCompare(b.name)
  },
   {
    title:'部门',
    dataIndex:'organization',
  },
  {
    title:'负责人',
    render(_value,project){
      return <span>
         {users.find((user) => String(user.id) === String(project.personId))?.name ||
                "未知"}
      </span>
    }
  },
  {
    title:'创建时间',
    render(_value,project){
      return <span>
        {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
      </span>
    }
  }
]} dataSource={dataSource} />
}