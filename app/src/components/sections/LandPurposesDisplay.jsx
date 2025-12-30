import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Title from "../nav/Title"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import LandPurpose from "../models/LandPurpose";
import InsertLandPurpose from "../forms/landPurpose/InsertLandPurpose"
import UpdateLandPurpose from "../forms/landPurpose/UpdateLandPurpose"

const LandPurposesDisplay = () => {
    const {get, deleteReq, post} = useApi();
    const [formName, setFormName] = useState(null);
    const [landPurposes, setLandPurposes] = useState([]);
    
    const getLandPurposes = () => {
        get("/api/land-purposes/get-all", (res) => setLandPurposes(res.data.landPurposes))
    }

    const insertFile = () => {
        post("/api/land-purposes/insert-file", {}, (res) => getLandPurposes())
    }

    const handleDelete = (id) => {
        deleteReq("/api/land-purposes/delete", {idLandPurpose:id}, (res) => setLandPurposes((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    useEffect(() => {
        getLandPurposes();
    }, []);

    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Przeznaczenia działek"}/>
            <section className="flex flex-col w-full p-5">
                <section className="flex items-center gap-x-5">
                    <h1 className="text-4xl font-bold">Przeznaczenia działek</h1>
                    <button className="primary-btn" onClick={() => setFormName("insert")}>
                        <FontAwesomeIcon icon={faPlus}/> Dodaj nowe przeznaczenie działki
                    </button>
                    <button className="primary-btn" onClick={insertFile}>
                        <FontAwesomeIcon icon={faFolderPlus}/> Dodaj zapisane przeznaczenia działek
                    </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {landPurposes.length}</h2>
                <section className="my-5">
                    {
                        landPurposes.map((obj, index) => <LandPurpose
                                                        data={obj}
                                                        key={obj.id}
                                                        number={index + 1}
                                                        onDelete={handleDelete}
                                                        onUpdate={() => setFormName("update")}
                                                />)
                    }
                </section>
            </section>
            {
                formName == "insert" && <InsertLandPurpose onClose={() => setFormName(null)} reload={getLandPurposes}/>
            }
            {
                formName == "update" && <UpdateLandPurpose onClose={() => setFormName(null)} reload={getLandPurposes}/>
            }
        </section>
    )
}

export default LandPurposesDisplay;