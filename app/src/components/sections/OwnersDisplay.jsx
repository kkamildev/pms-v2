import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../nav/Title";
import { useState } from "react";
import { faMagnifyingGlass, faRefresh } from "@fortawesome/free-solid-svg-icons";
import useApi from "../../hooks/useApi";
import useFormFields from "../../hooks/useFormFields";
import OwnersSearch from "../searchBars/OwnersSearch"


const OwnersDisplay = () => {

    const {get} = useApi();

    const [setSearchFieldsData, searchFieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"nameFilter",
            allowNull:true,
        },
        {
            name:"limit",
            allowNull:true,
            regexp:/^[0-9]+$/,
            errorText:"Nie poprawny"
        },
    ]);

    const [formName, setFormName] = useState(null);

    const [owners, setOwners] = useState([]);



    const getOwners = () => {
        const params = new URLSearchParams({
            ...searchFieldData
        });
        get(`/api/owners/get?${params.toString()}`, (res) => setOwners(res.data.owners))
    }

    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Właściciele"}/>
            <section className="flex flex-col w-full p-5 overflow-y-auto">
                <section className="flex justify-between">
                        <section className="flex items-center gap-x-5">
                            <h1 className="text-4xl font-bold">Właściciele</h1>
                            <button className="primary-btn" onClick={() => setFormName("search")}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/> Opcje szukania
                            </button>
                        </section>
                        <button className="edit-btn" onClick={getOwners}>
                            <FontAwesomeIcon icon={faRefresh}/> Odśwież
                        </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {owners.length}</h2>
                <section className="my-5">
                    
                </section>
            </section>
            {
                formName == "search" && <OwnersSearch
                                            onClose={() => setFormName(null)}
                                            onSubmit={getOwners}
                                            setFieldData={setSearchFieldsData}
                                            fieldData={searchFieldData}
                                            errors={errors}
                                            isValidated={isValidated}
                                        />
            }
        </section>
    )
}

export default OwnersDisplay;