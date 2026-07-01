import { Drawer, Button } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { selectProjectModalOpen, selectEditingProjectId, projectListActions } from "./project-list-slice"

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    const editingProjectId = useSelector(selectEditingProjectId)

    const onClose = () => {
        dispatch(projectListActions.closeProjectModal())
    }

    return <Drawer onClose={onClose} open={projectModalOpen} size={'100%'}>
        <h1>{editingProjectId ? `编辑项目 ${editingProjectId}` : '创建项目'}</h1>
        <Button onClick={onClose}>关闭</Button>
    </Drawer>
}
