
import { useEffect, useState } from "react";
import Title from "../nav/Title"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import useApi from "../../hooks/useApi";
import GeneralPlan from "../models/GeneralPlan";
import InsertGeneralPlan from "../forms/generalPlan/InsertGeneralPlan";
import UpdateGeneralPlan from "../forms/generalPlan/UpdateGeneralPlan";
import RoleRequired from "../nav/RoleRequired"

const GeneralPlansDisplay = () => {
    const {get, deleteReq, post} = useApi();
    const [formName, setFormName] = useState(null);
    const [generalPlans, setGeneralPlans] = useState([]);

    const getGeneralPlans = () => {
        get("/api/general-plans/get-all", (res) => setGeneralPlans(res.data.generalPlans))
    }

    const insertFile = () => {
        post("/api/general-plans/insert-file", {}, (res) => getGeneralPlans())
    }

    const handleDelete = (id) => {
        deleteReq("/api/general-plans/delete", {idGeneralPlan:id}, (res) => setGeneralPlans((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    useEffect(() => {
        getGeneralPlans();
    }, []);

    return (
        <RoleRequired roles={["ADMIN"]}>
            <section className="flex justify-between h-full">
                <Title title={"PMS-v2 - Plany ogólne"}/>
                <section className="flex flex-col w-full p-5">
                    <section className="flex justify-between">
                        <section className="flex items-center gap-x-5">
                            <h1 className="text-4xl font-bold">Plany ogólne</h1>
                            <button className="primary-btn" onClick={() => setFormName("insert")}>
                                <FontAwesomeIcon icon={faPlus}/> Dodaj nowy plan ogólny
                            </button>
                            <button className="primary-btn" onClick={insertFile}>
                                <FontAwesomeIcon icon={faFolderPlus}/> Dodaj zapisane plany ogólne
                            </button>
                        </section>
                        <button className="edit-btn" onClick={getGeneralPlans}>
                            <FontAwesomeIcon icon={faRefresh}/> Odśwież
                        </button>
                    </section>
                    <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {generalPlans.length}</h2>
                    <section className="my-5">
                        {
                            generalPlans.map((obj, index) => <GeneralPlan
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
                    formName == "insert" && <InsertGeneralPlan onClose={() => setFormName(null)} reload={getGeneralPlans} generalPlans={generalPlans}/>
                }
                {
                    formName == "update" && <UpdateGeneralPlan onClose={() => setFormName(null)} reload={getGeneralPlans} mpzp={generalPlans}/>
                }
            </section>
        </RoleRequired>
    )
}

export default GeneralPlansDisplay;