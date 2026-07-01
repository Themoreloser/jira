import { Drawer, Button } from "antd"
import { useAuth } from "../../context/auth-context"

export const ProjectModel = () => {
    const { projectModalOpen, editingProjectId, closeProjectModal } = useAuth()

    return <Drawer onClose={closeProjectModal} open={projectModalOpen} size={'100%'}>
        <h1>{editingProjectId ? `编辑项目 ${editingProjectId}` : '创建项目'}</h1>
        <Button onClick={closeProjectModal}>关闭</Button>
    </Drawer>
}
