import { useEffect } from "react";
import { useUpdateDataStore } from "../../../hooks/stores";
import useApi from "../../../hooks/useApi";
import useFormFields from "../../../hooks/useFormFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "../../inputs/Select";
import Input from "../../inputs/Input";
import Form from "../../inputs/Form"

const UpdateLocation = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();
    const locationData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"taxDistrict",
            allowNull:true,
            regexp:/^[1-4]$/,
            errorText:"Nie poprawny",
        },
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

    useEffect(() => {
        setFieldData({
            taxDistrict:locationData.taxDistrict ? `${locationData.taxDistrict}` : null,
            agriculturalTax:locationData.agriculturalTax,
            forestTax:locationData.forestTax
        });
    }, [locationData]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            put("/api/locations/update", {idLocation:locationData.id,
                taxDistrict:fieldData.taxDistrict || null,
                agriculturalTax:fieldData.agriculturalTax || null,
                forestTax:fieldData.forestTax || null
                }, (res) => {
                onClose()
                reload()
            });
        }
    }
    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja Gminy Nr {locationData.number}</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Select
                    title="Okręg podatkowy"
                    error={errors.taxDistrict}
                    handleChange={(e) => setFieldData((prev) => ({...prev, taxDistrict:e.target.value}))}
                    value={fieldData.taxDistrict}
                    defaultOption="Nie wybrano"
                    defaultOptionHidden={true}
                    options={<>
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                        <option value="4">IV</option>
                    </>}
                />
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
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateLocation;