import { createContext, useContext, useState, type ReactNode } from "react"

interface ProjectListContextValue {
    projectModalOpen: boolean
    openProjectModal: () => void
    closeProjectModal: () => void
    editingProjectId: number | undefined
    startEditProject: (id: number) => void
}

const ProjectListContext = createContext<ProjectListContextValue | undefined>(undefined)
ProjectListContext.displayName = "ProjectListContext"

export const ProjectListProvider = ({ children }: { children: ReactNode }) => {
    const [projectModalOpen, setProjectModalOpen] = useState(false)
    const [editingProjectId, setEditingProjectId] = useState<number | undefined>(undefined)

    const openProjectModal = () => setProjectModalOpen(true)
    const closeProjectModal = () => {
        setProjectModalOpen(false)
        setEditingProjectId(undefined)
    }
    const startEditProject = (id: number) => {
        setEditingProjectId(id)
        setProjectModalOpen(true)
    }

    return (
        <ProjectListContext.Provider
            value={{ projectModalOpen, openProjectModal, closeProjectModal, editingProjectId, startEditProject }}
        >
            {children}
        </ProjectListContext.Provider>
    )
}

export const useProjectListContext = () => {
    const context = useContext(ProjectListContext)
    if (!context) {
        throw new Error("useProjectListContext 必须在 ProjectListProvider 中使用")
    }
    return context
}
