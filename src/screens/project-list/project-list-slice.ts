import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

interface State {
    projectModalOpen: boolean
    editingProjectId: number | undefined
}

const initialState: State = {
    projectModalOpen: false,
    editingProjectId: undefined
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state) {
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
            state.editingProjectId = undefined
        },
        startEditProject(state, action: { payload: number }) {
            state.projectModalOpen = true
            state.editingProjectId = action.payload
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
export const selectEditingProjectId = (state: RootState) => state.projectList.editingProjectId
