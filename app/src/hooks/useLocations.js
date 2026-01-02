
import { useEffect, useState } from "react";
import locations from "../data/towns.json"
import useApi from "./useApi";

const useLocations = (selectedProvince, selectedDistrict, selectedCommune, selectedTown) => {
    const {get} = useApi();
    const [provinces, setProvinces] = useState(Object.keys(locations));
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [towns, setTowns] = useState([]);

    useEffect(() => {
        if(locations[selectedProvince]) {
            setDistricts(Object.keys(locations[selectedProvince]));
            if(locations[selectedProvince][selectedDistrict]) {
                setCommunes(locations[selectedProvince][selectedDistrict]);
            }
        }
        if(!locations[selectedProvince]) {
            const districts = Object.values(locations).reduce((acc, obj) => [...acc, ...Object.keys(obj)], [])
            setDistricts(districts)  
        }
        if(!(locations[selectedProvince] && locations[selectedProvince][selectedDistrict])) {
            setCommunes(Object.values(locations).reduce((acc, obj) => [...acc, ...Object.values(obj).reduce((acc, obj) => [...acc, ...obj], [])], []))
        }
    }, [selectedProvince, selectedDistrict, selectedCommune]);

    useEffect(() => {
        if(selectedTown && selectedTown.length > 2) {
            const params = new URLSearchParams({
                town:selectedTown,
                commune:selectedCommune,
                district:selectedDistrict,
                province:selectedProvince
            })
            get(`/api/locations/get-towns?${params.toString()}`, (res) => setTowns(res.data.towns))
        }
    }, [selectedTown, selectedProvince, selectedDistrict, selectedCommune])

    return [provinces, districts, communes, towns]
}

export default useLocations;