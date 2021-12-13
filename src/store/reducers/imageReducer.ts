import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ImageState {
    key: string
    imgSrc: string
    date: string
}

interface InitialState {
    loadStatus: boolean
    images: ImageState[]
}



const initialState: InitialState = {
    loadStatus: false,
    images: []
}

export interface PayloadType {
    key: string
    imgSrc: string
    date: string
}

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<PayloadType>) => {
            const dataPayload: ImageState = {
                key: action.payload.key,
                imgSrc: action.payload.imgSrc,
                date: action.payload.date
            }
            state.images.unshift(dataPayload)
        },
        updateImage: (state, action: PayloadAction<PayloadType>) => {
            state.images[0].imgSrc = action.payload.imgSrc
        },
        loaded: (state) => {
            state.loadStatus = true
        }
    }
})

export const { addImage, updateImage, loaded } = imageSlice.actions

export default imageSlice.reducer