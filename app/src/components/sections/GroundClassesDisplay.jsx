
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Title from "../nav/Title";
import ErrorBox from "../popups/ErrorBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRefresh, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import RoleRequired from "../nav/RoleRequired";
import GroundClassesTable from "../models/GroundClassesTable"
import InsertGroundClass from "../forms/groundClass/InsertGroundClass";

const GroundClassesDisplay = () => {
    const {get} = useApi();

    const [formName, setFormName] = useState(null);
    const [groundClasses, setGroundClasses] = useState({});

    const getGroundClasses = () => {
        get("/api/ground-classes/get", (res) => {
            const classes = res.data.classes;
            const finalClasses = {};
            [...classes].forEach((obj) => {
                if(!finalClasses[obj.tax]) {
                    finalClasses[obj.tax] = [];
                }
                const element = finalClasses[obj.tax].find((value) => value.class == obj.class)
                if(element) {
                    element.converters[obj.taxDistrict] = obj.converter;
                } else {
                    if(obj.tax == "rolny")
                        obj.converters = [obj.converter];
                    else
                        obj.converters = []
                    finalClasses[obj.tax] = [...finalClasses[obj.tax], obj]
                }
            })
            setGroundClasses(finalClasses);
        })
    }

    useEffect(() => {
        getGroundClasses();
    }, []);

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
                    <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {Object.values(groundClasses).reduce((acc, value) => value.reduce((acc, value) => acc + 1, 0) + acc, 0)}</h2>
                    <section className="my-5">
                        <GroundClassesTable
                            title="Przeliczniki klas rolnych"
                            data={groundClasses["rolny"]}
                            headHeaders={["Klasa", "I", "II", "III", "IV", "Operacje"]}
                        />
                        <GroundClassesTable
                            title="Klasy gruntów leśnych"
                            data={groundClasses["lesny"]}
                            headHeaders={["Klasa", "Operacje"]}
                        />
                        <GroundClassesTable
                            title="Inne klasy gruntów"
                            data={groundClasses["brak"]}
                            headHeaders={["Klasa", "Operacje"]}
                        />
                    </section>
                </section>
                {
                    formName == "insert" && <InsertGroundClass onClose={() => setFormName(null)} reload={getGroundClasses}/>
                }
            </section>
        </RoleRequired>
    )
}

export default GroundClassesDisplay;