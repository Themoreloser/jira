import React from "react";
import { App, Dropdown, Table } from "antd";
import type { User } from "./search-list";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../util/project";
import type { JSX } from "@emotion/react/jsx-runtime";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin?: boolean;
  organization: string;
  created: number;
}
interface ListProps {
  loading?: boolean;
  dataSource: Project[];
  users: User[];
  refresh?: () => void;
}
export const List = ({ loading, users, dataSource }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin });
  
  return (
    <Table<Project>
      loading={loading}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(_value, project) {
            return (
              <span>
                {users.find(
                  (user) => String(user.id) === String(project.personId),
                )?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(_value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
       {
  render(_value, project) {
    return (
     <More project={project}/>
    );
  },
}
      ]}
      dataSource={dataSource}
    />
  );
};

const More = ({project}:{project:Project})=>{
 const editProject = (id: number) => () =>
    startEdit(id)
  const {startEdit} = useProjectModal()
  const {mutate:deleteProject} = useDeleteProject(useProjectQueryKey())
  const { modal } = App.useApp()
  const confirmDeleteProject = (id:number) => () =>{
    modal.confirm({
      title:"确定删除这个项目吗",
      content:"点击确定删除",
      okText:"确定",
      onOk(){
        deleteProject({id})
      }
    })
  }
  return <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: '编辑',
              onClick:editProject(project.id)
            },
            {
              key:"delete",
              label:'删除',
              onClick:confirmDeleteProject(project.id)
            }
          ],
        }}
      >
        <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
      </Dropdown>
}
