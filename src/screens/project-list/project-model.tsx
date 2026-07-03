import React from "react"
import { Drawer ,Button} from "antd"
import { useProjectModal } from "./util"

export const ProjectModel = ()=>{
    const {close,projectModalOpen} = useProjectModal()
    return <Drawer onClose={close} open = {projectModalOpen} size={'100%'}>
        <h1>Project Model</h1>
        <Button onClick={close}>关闭</Button>
    </Drawer>
}