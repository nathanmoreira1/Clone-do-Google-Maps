//libs
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
//css
import "../componentsCSS/Map.css"
//hooks
import { useState } from "react"
//components
import { SearchRoutes } from "../components/SearchRoutes"
import { SearchLocation } from "../components/SearchLocation"
import { RequestUserLocation } from './RequestUserLocation';

export const Map = () => {
    const [adress, setAdress] = useState("");
    const [startCoordinates, setStartCoordinates] = useState({
        lat: null,
        lng: null
    })
    const [endCoordinates, setEndCoordinates] = useState({
        lat: null,
        lng: null
    })
    const [coordinates, setCoordinates] = useState({
        lat: 52.505,
        lng: -0.09
    });
    const [showRoutesComponent, setShowRoutesComponent] = useState(false);
    const [showRequestUserLocation, setShowRequestUserLocation] = useState(true);
    const [userLocationPermission, setUserLocationPermission] = useState(false);

    const ChooseAPlaceByClick = () => {
        const map = useMapEvents({
            click(e) {
                setCoordinates(e.latlng)
            }
        })
        map.flyTo(coordinates)
        return (
            <Marker position={coordinates}></Marker>
        )
    }

    const CatchActualUserLocationForStartCoordinates = () => {
        if (userLocationPermission === true) {
            navigator.geolocation.getCurrentPosition(location => {
                setStartCoordinates({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                })
                setCoordinates({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                })
            });
            return true;
        }
    }

    const createRoutineMachineLayer = (props) => {
        const instance = L.Routing.control({
            waypoints: [
                L.latLng(startCoordinates.lat, startCoordinates.lng),
                L.latLng(endCoordinates.lat, endCoordinates.lng)
            ],
            position: 'bottomright',
            lineOptions: {
                styles: [
                    {
                        color: '#757de8',
                    }
                ]
            }
        });
        return instance;
    };

    const RoutingMachine = createControlComponent(createRoutineMachineLayer);

    return (
        <>
            {showRequestUserLocation &&
                <RequestUserLocation
                    setShowRequestUserLocation={setShowRequestUserLocation}
                    setUserLocationPermission={setUserLocationPermission} />
            }
            {!showRoutesComponent &&
                <SearchLocation
                    userLocationPermission={userLocationPermission}
                    coordinates={coordinates} adress={adress}
                    setCoordinates={setCoordinates}
                    setAdress={setAdress}
                    setShowRoutesComponent={setShowRoutesComponent} />
            }
            {showRoutesComponent && <SearchRoutes
                setStartCoordinates={setStartCoordinates}
                setEndCoordinates={setEndCoordinates}
                setShowRoutesComponent={setShowRoutesComponent}
                CatchActualUserLocationForStartCoordinates={CatchActualUserLocationForStartCoordinates}
                setShowRequestUserLocation={setShowRequestUserLocation} />
            }
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[coordinates.lat, coordinates.lng]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!showRoutesComponent && <ChooseAPlaceByClick />}
                {!showRoutesComponent &&
                    <Marker position={[coordinates.lat, coordinates.lng]}></Marker>
                }
                <ZoomControl position='bottomright' />
                {startCoordinates.lat !== null && startCoordinates.lng !== null && endCoordinates.lat !== null && endCoordinates.lng !== null ?
                    (
                        <RoutingMachine />

                    ) : (
                        null
                    )
                }
            </MapContainer>
        </>
    )
}