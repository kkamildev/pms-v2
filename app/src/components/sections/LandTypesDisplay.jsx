import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Title from "../nav/Title"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import LandType from "../models/LandType";
import InsertLandType from "../forms/landType/InsertLandType";
import UpdateLandType from "../forms/landType/UpdateLandType";
import RoleRequired from "../nav/RoleRequired";


const LandTypesDisplay = () => {
    const {get, deleteReq, post} = useApi();
    const [formName, setFormName] = useState(null);
    const [landTypes, setLandTypes] = useState([]);
    
    const getLandTypes = () => {
        get("/api/land-types/get-all", (res) => setLandTypes(res.data.landTypes))
    }

    const insertFile = () => {
        post("/api/land-types/insert-file", {}, (res) => getLandTypes())
    }

    const handleDelete = (id) => {
        deleteReq("/api/land-types/delete", {idLandType:id}, (res) => setLandTypes((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    useEffect(() => {
        getLandTypes();
    }, []);

    return (
        <RoleRequired roles={["ADMIN"]}>
            <section className="flex justify-between h-full">
                <Title title={"PMS-v2 - Rodzaje działek"}/>
                <section className="flex flex-col w-full p-5">
                    <section className="flex justify-between">
                        <section className="flex items-center gap-x-5">
                            <h1 className="text-4xl font-bold">Rodzaje działek</h1>
                            <button className="primary-btn" onClick={() => setFormName("insert")}>
                                <FontAwesomeIcon icon={faPlus}/> Dodaj nowy rodzaj działki
                            </button>
                            <button className="primary-btn" onClick={insertFile}>
                                <FontAwesomeIcon icon={faFolderPlus}/> Dodaj zapisane rodzaje działek
                            </button>
                        </section>
                        <button className="edit-btn" onClick={getLandTypes}>
                            <FontAwesomeIcon icon={faRefresh}/> Odśwież
                        </button>
                    </section>
                    <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {landTypes.length}</h2>
                    <section className="my-5">
                        {
                            landTypes.map((obj, index) => <LandType
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
                    formName == "insert" && <InsertLandType onClose={() => setFormName(null)} reload={getLandTypes}/>
                }
                {
                    formName == "update" && <UpdateLandType onClose={() => setFormName(null)} reload={getLandTypes}/>
                }
            </section>
        </RoleRequired>
    )
}

export default LandTypesDisplay;