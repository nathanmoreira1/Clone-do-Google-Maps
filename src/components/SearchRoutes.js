//images
import startLocationIcon from "../images/start_location.png"
import routeIcon from "../images/route.png"
import endLocation from "../images/place_outline.png"
import close from "../images/close.png"
import back from "../images/back.png"
import show from "../images/show.png"
import userLocationIcon from "../images/userActualLocation.png"
//libs
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
//hooks
import { useState, useRef, useEffect } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions"
//css
import "../componentsCSS/SearchRoutes.css"
//components
import { PlacesAutocompleteInput } from "./PlacesAutocompleteInput"

export const SearchRoutes = ({ setStartCoordinates, setEndCoordinates, setShowRoutesComponent, CatchActualUserLocationForStartCoordinates, setShowRequestUserLocation }) => {
    const [startAdress, setStartAdress] = useState("");
    const [endAdress, setEndAdress] = useState("");
    const [componentIsHidden, setComponentIsHidden] = useState(false);
    const SearchRoutesRef = useRef();
    const inputFieldRef = useRef();
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const WidthAdjustment = () => {
            if (width < 420) {
                SearchRoutesRef.current.style.width = "100vw"
            }
        }
        WidthAdjustment()
    }, [])

    const convertStartAdressToCoordinates = async (local) => {
        const results = await geocodeByAddress(local);
        const latLon = await getLatLng(results[0]);
        setStartCoordinates(latLon);
        setStartAdress(local)
    }

    const convertEndAdressToCoordinates = async (local) => {
        const results = await geocodeByAddress(local);
        const latLon = await getLatLng(results[0]);
        setEndCoordinates(latLon);
        setEndAdress(local)
    }

    const hideComponent = () => {
        if (width < 420) {
            SearchRoutesRef.current.style.animationName = "hideComponentWithWidthSmallerThan420";
        }
        else {
            SearchRoutesRef.current.style.animationName = "hideComponent";
        }
        SearchRoutesRef.current.style.animationDuration = "1s";
        SearchRoutesRef.current.style.animationFillMode = "forwards";
        inputFieldRef.current.style.animationName = "removesOpacity";
        inputFieldRef.current.style.animationDuration = "1s";
        inputFieldRef.current.style.animationFillMode = "forwards"
    }

    const showComponent = () => {
        if (width < 420) {
            SearchRoutesRef.current.style.animationName = "showComponentWithWidthSmallerThan420";
        }
        else {
            SearchRoutesRef.current.style.animationName = "showComponent";
        }
        inputFieldRef.current.style.animationName = "putsTheOpacity";
        inputFieldRef.current.style.animationDuration = "1s";
        inputFieldRef.current.style.animationFillMode = "forwards"
    }

    return (
        <div className="SearchRoutes" ref={SearchRoutesRef}>
            <div className="closeRoutesComponent" onClick={() => {
                setShowRoutesComponent(false);
                setStartAdress("");
                setEndAdress("");
                setStartCoordinates({
                    lat: null,
                    lng: null
                });
                setEndCoordinates({
                    lat: null,
                    lng: null
                });
            }}>
                <img src={close} />
            </div>
            {!componentIsHidden &&
                <div className="hideRoutesComponent" onClick={() => {
                    hideComponent();
                    setComponentIsHidden(true);
                }}>
                    <img src={back} />
                </div>
            }
            {componentIsHidden &&
                <div className="showRoutesComponent" onClick={() => {
                    showComponent();
                    setComponentIsHidden(false)
                }}>
                    <img src={show} />
                </div>
            }
            <div className="searchRoutesField" ref={inputFieldRef}>
                <div className="searchRoutesDecoration">
                    <img src={startLocationIcon} />
                    <img src={routeIcon} />
                    <img src={endLocation} />
                </div>
                <form className="SearchRoutesInputField">
                    <PlacesAutocompleteInput
                        value={startAdress}
                        onChange={setStartAdress}
                        onSelect={convertStartAdressToCoordinates}
                        styles={
                            {
                                marginTop: "15px",
                                marginBottom: "15px",
                                marginRight: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "7px"
                            }
                        }
                        placeholder={"Escolher o ponto de partida"}
                        inputClassName={"searchRoutesInput"}
                        resultOfSearchClassName={"resultsOfSearchInitialRoute"}
                    />
                    <PlacesAutocompleteInput
                        value={endAdress}
                        onChange={setEndAdress}
                        onSelect={convertEndAdressToCoordinates}
                        styles={
                            {
                                marginTop: "15px",
                                marginBottom: "15px",
                                marginRight: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "7px"
                            }
                        }
                        placeholder={"Informe o destino..."}
                        inputClassName={"searchRoutesInput"}
                        resultOfSearchClassName={"resultsOfSearchInitialRoute"}
                    />
                </form>
            </div>
            <div className="userLocationPermissionField" onClick={() => {
                CatchActualUserLocationForStartCoordinates();
                if (CatchActualUserLocationForStartCoordinates()) {
                    setStartAdress("Seu local")
                }
                else {
                    setShowRequestUserLocation(true);
                }
            }}>
                {startAdress === "" && endAdress === "" ?
                    (
                        <>
                            <img src={userLocationIcon} />
                            <p>Seu local</p>
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}