import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useSearchParams } from "react-router-dom";
import Title from "../nav/Title";
import ErrorBox from "../popups/ErrorBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRefresh } from "@fortawesome/free-solid-svg-icons";
import CommunesSearch from "../searchBars/CommunesSearch";
import Commune from "../models/Commune";
import UpdateLocation from "../forms/location/UpdateLocation";

const CommunesDisplay = () => {
    const {get, put} = useApi();
    const [searchParams] = useSearchParams();

    const [formName, setFormName] = useState(null);
    const [communes, setCommunes] = useState([]);

    const getCommunes = () => {
        get(`/api/locations/get?${searchParams.toString()}`, (res) => setCommunes(res.data.locations))
    }

    useEffect(() => {
        getCommunes();
    }, [searchParams]);

    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Gminy i stawki podatkowe"}/>
            <section className={`flex flex-col w-full p-5 overflow-y-auto ${(["updateRent"].includes(formName)) && "hidden"}`}>
                <section className="self-start mb-3">
                    <ErrorBox/>
                </section>
                <section className="flex justify-between">
                    <section className="flex items-center gap-x-5">
                        <h1 className="text-4xl font-bold">Gminy</h1>
                        <button className="primary-btn" onClick={() => setFormName("search")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/> Opcje szukania
                        </button>
                    </section>
                    <button className="edit-btn" onClick={getCommunes}>
                        <FontAwesomeIcon icon={faRefresh}/> Odśwież
                    </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {communes.length}</h2>
                <section className="my-5">
                    {
                        communes.map((obj, index) => <Commune
                            key={obj.id}
                            number={index + 1}
                            data={obj}
                            onUpdate={() => setFormName("update")}
                        />)
                    }
                </section>
            </section>
            {
                formName == "search" && <CommunesSearch onClose={() => setFormName(null)}/>
            }
            {
                formName == "update" && <UpdateLocation onClose={() => setFormName(null)} reload={getCommunes}/>
            }
        </section>
    )
}

export default CommunesDisplay;