import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useNavigate } from 'react-router';
import { RootState } from '../../store';

interface Props extends PropsFromRedux {}

const Gallery = ({ listImage }: Props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!listImage.length){
            navigate("/")
        }
    }, [navigate, listImage])

    const handleBack = () => {
        navigate("/")
    }

    return (
        <>
            <div className="fixed top-4 left-4 z-10">
                <button
                    onClick={handleBack}
                >
                    <FontAwesomeIcon icon={faChevronCircleLeft} color="white" className="text-3xl"/>
                </button>
            </div>
            <Carousel 
                autoFocus
                emulateTouch={true}
                showArrows={false}
                showThumbs={false}
                useKeyboardArrows={true}
            >
                {
                    listImage.map((image) => (
                        <div key={image.key}>
                            <img alt="" src={image.imgSrc} />
                            <p className="legend">{moment(image.date).format('D MMMM YYYY') || 'no date'}</p>
                        </div>
                    ))
                }
            </Carousel>
        </>
    )
}

const mapState = (state: RootState) => ({
    listImage: state.image.images
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Gallery)
