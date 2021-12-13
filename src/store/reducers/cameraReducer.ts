import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface cameraData {
    value: string
    label: string
}

interface CameraState {
     listCamera: cameraData[]
     cameraId: string
}

const initialState: CameraState = {
     listCamera: [],
     cameraId: ''
}


export const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        selectCamera: (state, action: PayloadAction<string>) => {
            state.cameraId = action.payload
        },
        addDevice: (state, action: PayloadAction<cameraData>) => {
            state.listCamera.push(action.payload)
        }
    }
})

export const { selectCamera, addDevice } = cameraSlice.actions

export default cameraSlice.reducer