import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUpdateDataStore } from "../../../hooks/stores";
import useApi from "../../../hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../inputs/Input";
import useFormFields from "../../../hooks/useFormFields";
import { useEffect } from "react";
import Form from "../../inputs/Form"

const UpdateRenter = ({onClose = () => {}, reload = () => {}}) => {

    const {put} = useApi();
    const renterData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"name",
            allowNull:false,
            regexp:/^.{1,100}$/,
            errorText:"Za długi"
        },
        {
            name:"phone",
            allowNull:false,
            regexp:/^[0-9]{9}$/,
            errorText:"Nie poprawny"
        },
    ]);

    useEffect(() => {
        setFieldData({
            name:renterData.name,
            phone:renterData.phone
        });
    }, [renterData]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/renters/update", {...fieldData, idRenter:renterData.id}, (res) => {
                onClose()
                reload()
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold text-center">Edycja dzierżawcy</h1>
            <h2 className="text-2xl font-bold">Nr {renterData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj imie/nazwisko"
                    title="Imie/nazwisko"
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
export default UpdateRenter;