//css
import "../componentsCSS/RequestUserLocation.css"
//images
import close from "../images/close.png"
//hooks
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useEffect, useRef } from "react"

export const RequestUserLocation = ({ setShowRequestUserLocation, setUserLocationPermission }) => {
    const { height, width } = useWindowDimensions();
    const requestUserLocationRef = useRef()
    const requestUserLocationTitleRef = useRef()

    useEffect(() => {
        const WidthAdjustment = () => {
            if (width < 420) {
                requestUserLocationRef.current.style.width = "300px"
                requestUserLocationTitleRef.current.style.marginTop = "19px"
            }
        }
        WidthAdjustment()
    }, [])

    return (
        <div className='requestUserLocation' ref={requestUserLocationRef}>
            <img src={close} onClick={() => setShowRequestUserLocation(false)} />
            <h1 className='requestUserLocationTitle' ref={requestUserLocationTitleRef}>Esse site gostaria de saber sua localização. Gostaria de compartilhá-la conosco?</h1>
            <button onClick={() => {
                setShowRequestUserLocation(false);
                setUserLocationPermission(true);
            }}>Aceitar</button>
            <p>Informamos que essa informação não ficará salva sob hipótese alguma.</p>
            <p>Caso não queira, basta fechar essa janela.</p>
        </div>
    )
}