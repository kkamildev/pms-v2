import { useParams } from "react-router-dom";
import Title from "../nav/Title";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

const LandDataDisplay = () => {

    const {get} = useApi();

    const {id} = useParams();

    const [land, setLand] = useState({});

    useEffect(() => {
        get("/api/lands/get-one?idLand=" + id, (res) => {
            setLand(res.data.land)
        }, (err) => alert("Taka działka nie istnieje"));
    }, [id]);

    return (
        <section className="flex justify-between h-full">
            <Title title={`${land.serialNumber}`}/>
        </section>
    )
}

export default LandDataDisplay;