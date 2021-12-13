import { useCallback, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { OptionType } from './type'
import { defaultValueCamera } from './data'
import { AppDispatch, RootState } from "../../store";
import { addDevice, cameraData, selectCamera } from "../../store/reducers/cameraReducer";
import { connect, ConnectedProps } from "react-redux";

interface Props extends PropsFromRedux{}

const SelectCamera = ({selectCamera, addDevice, listCamera}: Props) => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        devices.map(device => {
            addDevice({
                value: device.deviceId,
                label: device.label
            })
        })
    }, [devices])

    const handleDevices = useCallback(
        (MediaDevices: MediaDeviceInfo[])  =>
            setDevices(MediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
    }, [handleDevices])

    const handleChangeCamera = (option: SingleValue<OptionType>) => {
        const cameraId: string = option ? option.value : ''
        selectCamera(cameraId)
    }

    return (
        <Select 
            options={listCamera} 
            onChange={option => handleChangeCamera(option)}
            defaultValue= {defaultValueCamera}
        />
    )
}

const mapState = (state: RootState) => ({
    listCamera: state.camera.listCamera
})

const mapDispatch = (dispatch: AppDispatch) => ({
    selectCamera: (cameraId: string) => dispatch(selectCamera(cameraId)),
    addDevice: (cameraId: cameraData) => dispatch(addDevice(cameraId))
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SelectCamera)