
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Title from "../nav/Title";
import ErrorBox from "../popups/ErrorBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import RoleRequired from "../nav/RoleRequired";
import GroundClassesTable from "../models/GroundClassesTable"
import InsertGroundClass from "../forms/groundClass/InsertGroundClass";
import UpdateGroundClass from "../forms/groundClass/UpdateGroundClass";

const GroundClassesDisplay = () => {
    const {get, deleteReq} = useApi();

    const [formName, setFormName] = useState(null);
    const [groundClasses, setGroundClasses] = useState([]);

    const getGroundClasses = () => {
        get("/api/ground-classes/get", (res) => setGroundClasses(res.data.classes))
    }

    useEffect(() => {
        getGroundClasses();
    }, []);

    const handleDelete = (id) => {
        deleteReq("/api/ground-classes/delete", {idGroundClass:id}, (res) => setGroundClasses((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    return (
        <RoleRequired roles={["KSIEGOWOSC", "SEKRETARIAT"]}>
            <section className="flex justify-between h-full">
                <Title title={"PMS-v2 - Klasy gruntu"}/>
                <section className="flex flex-col w-full p-5 overflow-y-auto">
                    <section className="self-start mb-3">
                        <ErrorBox/>
                    </section>
                    <section className="flex justify-between">
                        <section className="flex items-center gap-x-5">
                            <h1 className="text-4xl font-bold">Klasy gruntu</h1>
                            <button className="primary-btn" onClick={() => setFormName("insert")}>
                                <FontAwesomeIcon icon={faPlus}/> Dodaj nową klasę
                            </button>
                        </section>
                        <button className="edit-btn" onClick={getGroundClasses}>
                            <FontAwesomeIcon icon={faRefresh}/> Odśwież
                        </button>
                    </section>
                    <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {groundClasses.length}</h2>
                    <section className="my-5">
                        <GroundClassesTable
                            onDelete={handleDelete}
                            onUpdate={() => setFormName("update")}
                            title="Przeliczniki klas rolnych"
                            data={groundClasses.filter((obj) => obj.tax == "rolny")}
                            headHeaders={["Klasa", "I", "II", "III", "IV", "Operacje"]}
                        />
                        <GroundClassesTable
                            onDelete={handleDelete}
                            onUpdate={() => setFormName("update")}
                            title="Klasy gruntów leśnych"
                            data={groundClasses.filter((obj) => obj.tax == "lesny")}
                            headHeaders={["Klasa", "Operacje"]}
                        />
                        <GroundClassesTable
                            onDelete={handleDelete}
                            onUpdate={() => setFormName("update")}
                            title="Inne klasy gruntów"
                            data={groundClasses.filter((obj) => obj.tax == "brak")}
                            headHeaders={["Klasa", "Operacje"]}
                        />
                    </section>
                </section>
                {
                    formName == "insert" && <InsertGroundClass onClose={() => setFormName(null)} reload={getGroundClasses}/>
                }
                {
                    formName == "update" && <UpdateGroundClass onClose={() => setFormName(null)} reload={getGroundClasses}/>
                }
            </section>
        </RoleRequired>
    )
}

export default GroundClassesDisplay;