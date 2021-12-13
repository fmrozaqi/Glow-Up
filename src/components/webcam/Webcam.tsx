import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import useScreen from '../useScreen'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faCamera, faImage, faPowerOff, faRedo, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ButtonCenter from './ButtonCenter'
import BlurBackground from '../BlurBackground'
import GradientBlack from '../GradientBlack'
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import { signOut, getAuth } from 'firebase/auth'
import { useAuth } from "../../Auth/auth";
import { addImageToDatabase } from "../../firebase/actions"
import { getImageFromDatabase } from "../../firebase/actions"
import { loaded } from "../../store/reducers/imageReducer";

interface Props extends PropsFromRedux{}

const WebcamCapture = ({ deviceId, listImage, loadStatus, loaded }: Props) => {
    const [width, height] = useScreen()
    const navigate = useNavigate()
    const auth = useAuth()
    const [loading, setLoading] = useState(!loadStatus)

    useEffect(() => {
        if(!loadStatus){
            getImageFromDatabase().then(() => {
                setLoading(false)
                loaded()
            })
        }
    }, [loadStatus, loaded])

    const videoConstraints: MediaTrackConstraints = {
        facingMode: "user",
        aspectRatio: width/height
    };

    const webcamRef = useRef<Webcam>(null);
    const [ imgSrc, setImgSrc ] = useState<string>('')
    
    const capture = useCallback(
        async () => {
            const imageSrc = webcamRef.current?.getScreenshot()
            if(imageSrc) {
                setImgSrc(imageSrc)
                addImageToDatabase(imageSrc)
            } 
        }, [webcamRef]
    );

    const [ cameraStatus, setCameraStatus ] = useState<boolean>(true)
    const [ imgOffSrc, setImgOffSrc ] = useState<string>('')

    const toggleCamera = useCallback(
        () => {
            if(cameraStatus) {
                const imageSrc = webcamRef.current?.getScreenshot()
                if(imageSrc) setImgOffSrc(imageSrc)
            }
            setCameraStatus(!cameraStatus)
        },
        [cameraStatus],
    )

    const handleDownload = () => {
        const a = document.createElement("a")
        a.href = imgSrc
        a.download = "Image.jpeg"
        a.click()
    }

    const handleSignOut = () => {
        signOut(getAuth())
        auth.signOut()
        navigate('/login')
    }

    return (
    <>
        { loading ? <p>Loading</p> :
        <div>
            <div className="fixed top-4 right-4 z-10">
                <button className="text-gray-200 font-medium ml-2" onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
            { cameraStatus && 
                (imgSrc ? 
                    <>
                        <img src={imgSrc} alt="gambar"/>
                    </>
                    :
                    <>
                        <div className="w-full h-screen overflow-hidden">
                            <Webcam
                                audio={false}
                                height={height}
                                width={width}
                                ref={webcamRef}
                                mirrored={true}
                                imageSmoothing={true}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{...videoConstraints, deviceId }}
                            />
                        </div>
                        <GradientBlack/>
                    </>)
                
            }
            { cameraStatus ? 
                <div className="w-full h-36 fixed bottom-0 flex justify-center">
                    <div className="w-56 h-full flex items-center justify-center relative">
                        {!imgSrc ?
                            <ButtonCenter handleClick={(e)=>{e.preventDefault();capture();}}>
                                <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-300" />
                            </ButtonCenter>
                            :
                            <ButtonCenter handleClick={() => setImgSrc('')}>
                                <FontAwesomeIcon icon={faRedo} className="text-2xl text-gray-300"/>
                            </ButtonCenter>
                        }
                        <button 
                            className={`flex items-center justify-center absolute left-0 w-10 h-10 bg-white rounded-full backdrop-filter backdrop-blur-md bg-opacity-30`}
                            onClick={() => {navigate("/gallery")}}
                            disabled={!listImage.length}
                        >
                            <FontAwesomeIcon icon={faImage} color="white" className="text-sm"/>
                        </button>
                        <button
                            className={`flex items-center justify-center absolute right-0 w-10 h-10 bg-white rounded-full backdrop-filter backdrop-blur-md bg-opacity-30 ${imgSrc? "" : "hidden"}`}
                            onClick={handleDownload}
                        >
                            <FontAwesomeIcon icon={faArrowAltCircleDown} color="white" className="text-sm"/>
                        </button>
                    </div>
                </div>
                :
                <div className="w-full h-screen overflow-hidden flex items-center justify-center">
                    <BlurBackground/>
                    <img src={imgOffSrc} alt="gambar"/>
                </div>
            }

            { !imgSrc && 
                <div className="fixed top-4 left-4 z-10">
                    <label className="flex flex-row items-center cursor-pointer">
                        <div className="relative">
                            <input 
                                type="checkbox"
                                className="sr-only"
                                checked={cameraStatus}
                                onChange={toggleCamera}
                            />
                            <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-red-500 w-6 h-6 rounded-full transition"></div>
                        </div>
                        <div className="text-gray-200 font-medium ml-2">
                            <FontAwesomeIcon icon={faPowerOff} />
                        </div>
                    </label>
                </div>
            }
        </div>
        }
    </>
    )
}

const mapState = (state: RootState) => ({
    deviceId: state.camera.cameraId,
    listImage: state.image.images,
    loadStatus: state.image.loadStatus
})

const mapDispatch = (dispatch: AppDispatch) => ({
    loaded: () => dispatch(loaded())
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(WebcamCapture)