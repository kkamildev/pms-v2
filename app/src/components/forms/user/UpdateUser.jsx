import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import Select from "../../inputs/Select";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import { useUpdateDataStore } from "../../../hooks/stores";


const UpdateUser = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();
    const userData = useUpdateDataStore((state) => state.data);
    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"name",
            allowNull:false,
            regexp:/^[A-Za-zĄŚĆŻŹŃÓĘŁąćśńżźęół]{1,50}$/,
            errorText:"Za długie lub nie właściwe"
        },
        {
            name:"surname",
            allowNull:false,
            regexp:/^[A-Za-zĄŚĆŻŹŃÓĘŁąćśńżźęół]{1,50}$/,
            errorText:"Za długie lub nie właściwe"
        },
        {
            name:"role",
            allowNull:false
        },
    ]);

    useEffect(() => {
        setFieldData({
            name:userData.name,
            surname:userData.surname,
            role:userData.role
        })
    }, [])

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/users/update", {idUser:userData.id, ...fieldData}, (res) => {
                onClose()
                reload()
            })
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center scroll-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja użytkownika</h1>
            <h2 className="text-2xl font-bold">Nr {userData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj imie"
                    title="Imie"
                    error={errors.name}
                    handleChange={(e) => setFieldData((prev) => ({...prev, name:e.target.value}))}
                    value={fieldData.name}
                />
                <Input
                    placeholder="Podaj nazwisko"
                    title="Nazwisko"
                    error={errors.surname}
                    handleChange={(e) => setFieldData((prev) => ({...prev, surname:e.target.value}))}
                    value={fieldData.surname}
                />
                <Select
                    defaultOption="Wybierz role"
                    title="Rola"
                    error={errors.role}
                    options={["ADMIN", "SEKRETARIAT", "KSIEGOWOSC", "TEREN"].map(obj => <option key={obj} value={obj}>{obj}</option>)}
                    handleChange={(e) => setFieldData((prev) => ({...prev, role:e.target.value}))}
                    value={fieldData.role}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateUser;