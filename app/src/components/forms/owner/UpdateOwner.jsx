import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateDataStore } from "../../../hooks/stores";
import useApi from "../../../hooks/useApi";
import Input from "../../inputs/Input";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import useFormFields from "../../../hooks/useFormFields";
import { useEffect } from "react";
import Form from "../../inputs/Form"

const UpdateOwner = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();
    const ownerData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"name",
            allowNull:false,
            regexp:/^.{1,100}$/,
            errorText:"Za długi"
        },
        {
            name:"phone",
            allowNull:true,
            regexp:/^[0-9]{9}$/,
            errorText:"Nie poprawny"
        },
    ]);

    useEffect(() => {
        setFieldData({
            name:ownerData.name,
            phone:ownerData.phone
        });
    }, [ownerData]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/owners/update", {idOwner:ownerData.id, ...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }
    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja Właściciela</h1>
            <h2 className="text-2xl font-bold">Nr {ownerData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj imie"
                    title="Imie"
                    error={errors.name}
                    handleChange={(e) => setFieldData((prev) => ({...prev, name:e.target.value}))}
                    value={fieldData.name}
                />
                <Input
                    type="phone"
                    placeholder="Podaj telefon"
                    title="Numer telefonu"
                    error={errors.phone}
                    handleChange={(e) => setFieldData((prev) => ({...prev, phone:e.target.value}))}
                    value={fieldData.phone}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateOwner;