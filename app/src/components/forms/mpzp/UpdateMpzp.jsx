import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import useApi from "../../../hooks/useApi";
import TextArea from "../../inputs/TextArea";
import { useEffect } from "react";
import { useUpdateDataStore } from "../../../hooks/stores";


const UpdateMpzp = ({onClose = () => {}, reload = () => {}, mpzp = []}) => {

    const {put} = useApi();
    const mpzpData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"code",
            allowNull:false,
            regexp:/^.{1,8}$/,
            errorText:"Za długi"
        },
        {
            name:"description",
            allowNull:false,
            regexp:/^.{1,70}$/,
            errorText:"Za długi"
        },
    ]);

    useEffect(() => {
        setFieldData({
            code:mpzpData.code,
            description:mpzpData.description
        });
    }, []);

    useEffect(() => {
        if(fieldData.code) {
            const obj = [...mpzp].find((obj) => obj.code === fieldData.code);
            if (obj) {
                setFieldData((prev) => ({...prev, description:obj.description}));
            } else {
                setFieldData((prev) => ({...prev, description:null}));
            }
        }
    }, [fieldData.code])

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/mpzp/update", {idMpzp:mpzpData.id, ...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja MPZP</h1>
            <h2 className="text-2xl font-bold">Nr {mpzpData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj kod"
                    title="Kod"
                    error={errors.code}
                    handleChange={(e) => setFieldData((prev) => ({...prev, code:e.target.value.toUpperCase()}))}
                    value={fieldData.code}
                />
                <TextArea
                    placeholder="Podaj opis"
                    title="Opis"
                    error={errors.description}
                    handleChange={(e) => setFieldData((prev) => ({...prev, description:e.target.value}))}
                    value={fieldData.description}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateMpzp;