import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import { useUpdateDataStore } from "../../../hooks/stores";

const UpdateLandPurpose = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();
    const landPurposeData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"type",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długi"
        },
    ]);

    useEffect(() => {
        setFieldData({
            type:landPurposeData.type,
        });
    }, []);

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/land-purposes/update", {idLandPurpose:landPurposeData.id, ...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }
    
    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja Przeznaczenia działki</h1>
            <h2 className="text-2xl font-bold">Nr {landPurposeData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj rodzaj działki"
                    title="Rodzaj działki"
                    error={errors.type}
                    handleChange={(e) => setFieldData((prev) => ({...prev, type:e.target.value}))}
                    value={fieldData.type}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateLandPurpose;