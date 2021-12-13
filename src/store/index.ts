import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from './reducers/cameraReducer'
import imageReducer from './reducers/imageReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
    reducer: {
        camera: cameraReducer,
        image: imageReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store