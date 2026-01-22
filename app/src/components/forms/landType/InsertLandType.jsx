import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import useApi from "../../../hooks/useApi";

const InsertLandType = ({onClose = () => {}, reload = () => {}}) => {
    const {post} = useApi();

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"type",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długi"
        },
    ]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            post("/api/land-types/insert", {...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Dodaj Rodzaj diałki</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    placeholder="Podaj rodzaj działki"
                    title="Rodzaj działki"
                    error={errors.type}
                    handleChange={(e) => setFieldData((prev) => ({...prev, type:e.target.value}))}
                    value={fieldData.type}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPlus}/> Dodaj</button>
        </Form>
    )
}

export default InsertLandType;