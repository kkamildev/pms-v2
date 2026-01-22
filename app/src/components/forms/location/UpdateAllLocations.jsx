import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import useApi from "../../../hooks/useApi";
import useFormFields from "../../../hooks/useFormFields";
import Input from "../../inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"

const UpdateAllLocations = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"agriculturalTax",
            allowNull:true,
            regexp:/^\d{0,4}.\d{0,4}$/,
            errorText:"Nie poprawny (do 4 miejsc po przecinku)"
        },
        {
            name:"forestTax",
            allowNull:true,
            regexp:/^\d{0,4}.\d{0,4}$/,
            errorText:"Nie poprawny (do 4 miejsc po przecinku)"
        },
    ]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/locations/update-all", {...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold text-center">Nadpisywanie danych dla wszystkich gmin</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Input
                    title="Stawka podatku rolnego"
                    step="any"
                    min="0"
                    placeholder="Podaj stawkę podatku rolnego"
                    error={errors.agriculturalTax}
                    handleChange={(e) => setFieldData((prev) => ({...prev, agriculturalTax:e.target.value}))}
                    value={fieldData.agriculturalTax}
                />
                <Input
                    title="Stawka podatku leśnego"
                    step="any"
                    min="0"
                    placeholder="Podaj stawkę podatku leśnego"
                    error={errors.forestTax}
                    handleChange={(e) => setFieldData((prev) => ({...prev, forestTax:e.target.value}))}
                    value={fieldData.forestTax}
                />
            </section>
            <p className="text-xl font-bold text-red-800 text-center m-5">Zostaną nadpisane wszystkie dane gmin (jeżeli zostały wyżej podane)</p>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Nadpisz dla wszystkich</button>
        </Form>
    )

}

export default UpdateAllLocations;
