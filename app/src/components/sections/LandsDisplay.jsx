import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import Title from "../nav/Title";
import ErrorBox from "../popups/ErrorBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faPrint, faRefresh } from "@fortawesome/free-solid-svg-icons";
import LandsSearch from "../searchBars/LandsSearch";
import InsertLand from "../forms/land/InsertLand";
import Land from "../models/Land";


const LandsDisplay = () => {
    const {get, deleteReq} = useApi();
    const [searchParams] = useSearchParams();

    const [formName, setFormName] = useState(null);
    
    const [lands, setLands] = useState([]);


    useEffect(() => {
        getLands();
    }, [searchParams]);

    const getLands = () => {
        get(`/api/lands/get?${searchParams.toString()}`, (res) => setLands(res.data.lands))
    }

    const handleDelete = (id) => {
        deleteReq("/api/lands/delete", {idLand:id}, (res) => setLands((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Działki"}/>
            {
                formName != "insert" && 
                <section className="flex flex-col w-full p-5 overflow-y-auto">
                    <section className="self-start mb-3">
                        <ErrorBox/>
                    </section>
                    <section className="flex justify-between">
                        <section className="flex items-center gap-x-5">
                            <h1 className="text-4xl font-bold">Działki</h1>
                            <button className="primary-btn" onClick={() => setFormName("insert")}>
                                <FontAwesomeIcon icon={faPlus}/> Dodaj nową działkę
                            </button>
                            <button className="primary-btn" onClick={() => setFormName("search")}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/> Opcje szukania
                            </button>
                        </section>
                        <section className="flex items-center gap-x-5">
                            <button className="primary-btn">
                                <FontAwesomeIcon icon={faPrint}/> Drukuj
                            </button>
                            <button className="edit-btn" onClick={getLands}>
                                <FontAwesomeIcon icon={faRefresh}/> Odśwież
                            </button>
                        </section>
                    </section>
                    <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {lands.length}</h2>
                    <section className="my-5">
                        {
                            lands.map((obj, index) => <Land
                                                        data={obj}
                                                        number={index + 1}
                                                        onDelete={handleDelete}
                                                        onUpdate={() => setFormName("update")}
                                                        key={obj.id}
                                                        />)
                        }
                    </section>
                </section>
            }
            {
                formName == "search" && <LandsSearch onClose={() => setFormName(null)}/>
            }
            {
                formName == "insert" && <InsertLand onClose={() => setFormName(null)} reload={getLands}/>
            }
        </section>
    )
}

export default LandsDisplay;