//css
import "../componentsCSS/SearchLocation.css"
//libs
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import { useMapEvents } from "react-leaflet"
//images
import searchButton from "../images/search.png"
import menuButton from "../images/menu_black_24dp.png"
import routesButton from "../images/directions-2x-20150909.png"
//hooks
import { useEffect, useRef } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions"
//components
import { PlacesAutocompleteInput } from "./PlacesAutocompleteInput"

export const SearchLocation = ({ setAdress, setCoordinates, adress, coordinates, setShowRoutesComponent, userLocationPermission }) => {
    const searchLocationRef = useRef()
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const WidthAdjustment = () => {
            if (width < 420) {
                searchLocationRef.current.style.width = "95vw"
            }
        }
        WidthAdjustment()
    }, [])

    useEffect(() => {
        const changeBorderRadius = () => {
            if (adress !== "") {
                searchLocationRef.current.style.borderRadius = "8px 8px 0 0"
            }
            else {
                searchLocationRef.current.style.borderRadius = "8px"
            }
        }
        changeBorderRadius()
    }, [adress])

    useEffect(() => {
        const CatchActualUserLocation = () => {
            if (userLocationPermission === true) {
                navigator.geolocation.getCurrentPosition(location => {
                    setCoordinates({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    })
                });
            }
        }
        CatchActualUserLocation();
    }, [userLocationPermission]);

    const TakeLatLonFromTheSelectedLocation = async (local) => {
        if (local !== undefined) {
            const results = await geocodeByAddress(local);
            const latLon = await getLatLng(results[0]);
            setAdress(local);
            setCoordinates(latLon);
        }
        else {
            const results = await geocodeByAddress(adress);
            const latLon = await getLatLng(results[0]);
            setCoordinates(latLon);
        }
        const map = useMapEvents();
        map.flyTo(coordinates);
    }

    return (
        <div className="SearchLocation" ref={searchLocationRef}>
            <img src={menuButton} className="menuButton" />
            <form className="searchForm">
                <PlacesAutocompleteInput
                    value={adress}
                    onChange={setAdress}
                    onSelect={TakeLatLonFromTheSelectedLocation}
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
                    placeholder={"Pesquise no Google Maps"}
                    inputClassName={"searchInput"}
                    resultOfSearchClassName={"results-of-search-field"}
                />
            </form>
            <img src={searchButton} className="searchButton" onClick={() => TakeLatLonFromTheSelectedLocation()} />
            <div className="separation"></div>
            <img src={routesButton} className="routesButton" onClick={() => setShowRoutesComponent(true)} />
        </div>
    )
}