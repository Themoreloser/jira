import { Dropdown, Table } from "antd";
import type { User } from "./search-list";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../util/project";
import { ButtonNoPadding } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list-slice";

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
export const List = ({
  loading,
  users,
  dataSource,
  refresh,
}: ListProps) => {
  const dispatch = useDispatch()
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
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
                checked={project.pin ?? false}
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
          render(value, project) {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: (
                        <ButtonNoPadding
                          type={"link"}
                          onClick={() => dispatch(projectListActions.startEditProject(project.id))}
                        >
                          编辑
                        </ButtonNoPadding>
                      ),
                    },
                  ],
                }}
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      dataSource={dataSource}
    />
  );
};
