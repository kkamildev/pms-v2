import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Title from "../nav/Title";
import ErrorBox from "../popups/ErrorBox";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRefresh } from "@fortawesome/free-solid-svg-icons";
import RentsSearch from "../searchBars/RentsSearch";

const RentsDisplay = () => {

    const {get, deleteReq} = useApi();
    const [searchParams] = useSearchParams();

    const [formName, setFormName] = useState(null);

    const [renters, setRenters] = useState([]);

    const getRenters = () => {
        get(`/api/renters/get?${searchParams.toString()}`, (res) => setRenters(res.data.renters))
    }

    const handleDelete = (id) => {
        deleteReq("/api/renters/delete", {idRenter:id}, (res) => setRenters((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    useEffect(() => {
        getRenters();
    }, [searchParams])

    return(
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Dzierżawy i dzierżawcy"}/>
            <section className="flex flex-col w-full p-5 overflow-y-auto">
                <section className="self-start mb-3">
                    <ErrorBox/>
                </section>
                <section className="flex justify-between">
                    <section className="flex items-center gap-x-5">
                        <h1 className="text-4xl font-bold">Dzierżawcy</h1>
                        <button className="primary-btn" onClick={() => setFormName("search")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/> Opcje szukania
                        </button>
                    </section>
                    <button className="edit-btn" onClick={getRenters}>
                        <FontAwesomeIcon icon={faRefresh}/> Odśwież
                    </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {renters.length}</h2>
                <section className="my-5">
                    
                </section>
            </section>
            {
                formName == "search" && <RentsSearch onClose={() => setFormName(null)}/>
            }
        </section>
    )
}

export default RentsDisplay;