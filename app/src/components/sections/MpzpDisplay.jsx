
import { useEffect, useState } from "react";
import Title from "../nav/Title"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import useApi from "../../hooks/useApi";
import Mpzp from "../models/Mpzp";
import InsertMpzp from "../forms/mpzp/InsertMpzp";
import UpdateMpzp from "../forms/mpzp/UpdateMpzp";

const MpzpDisplay = () => {
    const {get, deleteReq, post} = useApi();
    const [formName, setFormName] = useState(null);
    const [mpzp, setMpzp] = useState([]);

    const getMpzp = () => {
        get("/api/mpzp/get-all", (res) => setMpzp(res.data.mpzp))
    }

    const insertFile = () => {
        post("/api/mpzp/insert-file", {}, (res) => getMpzp())
    }

    const handleDelete = (id) => {
        deleteReq("/api/mpzp/delete", {idMpzp:id}, (res) => setMpzp((prev) => [...prev.filter((obj) => obj.id != id)]))
    }

    useEffect(() => {
        getMpzp();
    }, []);

    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - MPZP"}/>
            <section className="flex flex-col w-full p-5">
                <section className="flex items-center gap-x-5">
                    <h1 className="text-4xl font-bold">MPZP</h1>
                    <button className="primary-btn" onClick={() => setFormName("insert")}>
                        <FontAwesomeIcon icon={faPlus}/> Dodaj nowy MPZP
                    </button>
                    <button className="primary-btn" onClick={insertFile}>
                        <FontAwesomeIcon icon={faFolderPlus}/> Dodaj zapisane MPZP
                    </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {mpzp.length}</h2>
                <section className="my-5">
                    {
                        mpzp.map((obj, index) => <Mpzp 
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
                formName == "insert" && <InsertMpzp onClose={() => setFormName(null)} reload={getMpzp} mpzp={mpzp}/>
            }
            {
                formName == "update" && <UpdateMpzp onClose={() => setFormName(null)} reload={getMpzp} mpzp={mpzp}/>
            }
        </section>
    )
}

export default MpzpDisplay;