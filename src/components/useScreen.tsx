import { useEffect, useState } from "react"

const useScreen = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowsHeight, setwindowsHeight] = useState(window.innerHeight)

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setwindowsHeight(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return ([windowWidth, windowsHeight])
}

export default useScreen