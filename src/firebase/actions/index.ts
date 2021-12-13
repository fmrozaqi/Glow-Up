import { ref, push, set, get, child, update } from '@firebase/database'
import { database } from '../index'
import store from '../../store'
import moment from 'moment'
import { addImage, PayloadType, updateImage } from '../../store/reducers/imageReducer'

export const addImageToDatabase = (image = '') => {
    const uid = store.getState().auth.uid
    const lastImage = store.getState().image.images[0]
    const imageRef = ref(database, `users/${uid}/images`)
    const imagePushRef = push(imageRef)
    const imageData = {
        imgSrc: image,
        date: moment().format()
    }
    if(lastImage && moment(lastImage.date).format('D MMMM YYYY') === moment(imageData.date).format('D MMMM YYYY')){
        const updateRef = ref(database, `users/${uid}/images/${lastImage.key}`)
        update(updateRef, imageData)
        store.dispatch(updateImage({
            key: lastImage.key,
            ...imageData
        }))

    } else {
        set(imagePushRef, imageData)
        store.dispatch(addImage({
            key: imagePushRef.key!,
            ...imageData
        }))
    }
}

interface Image {
    imgSrc: string
    date: string
}

export const getImageFromDatabase = async () => {
    const uid = store.getState().auth.uid
    await get(child(ref(database), `users/${uid}/images`)).then((snapshot) => {
        if(snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key
                const image = childSnapshot.val() as Image
                const imgData: PayloadType = {
                    key: key!,
                    ...image
                }
                store.dispatch(addImage(imgData))  
            })
        }
    })
}