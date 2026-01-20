
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormFields from "../../../hooks/useFormFields";
import Input from "../../inputs/Input";
import TipSelect from "../../inputs/TipSelect";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const InsertArea = ({onInsert = (area) => {}, groundClasses = []}) => {

     const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"idGroundClass",
            allowNull:false,
            regexp:/^.{1,100}$/,
            errorText:"Za długi"
        },
        {
            name:"area",
            allowNull:false,
            regexp:/^\d{0,4}.\d{4}$/,
            errorText:"Nie poprawna (4 miejsca po przecinku)"
        },
    ]);

    const handleSubmit = () => {
        if(isValidated()) {
            onInsert({...fieldData});
            setFieldData({});
            setErrors({});
        }
    }

    return(
        <section className="border-3 p-5 flex flex-col items-center overflow-auto">
            <h1 className="text-2xl font-bold text-center">Dodawanie powierzchni</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <TipSelect
                    placeholder="Podaj klasę gruntu"
                    title="Klasa gruntu"
                    options={groundClasses.map((obj) => ({key:`${obj.class}`, value:obj.id}))}
                    handleChange={(value) => setFieldData((prev) => ({...prev, idGroundClass:value}))}
                    value={fieldData.idGroundClass}
                />
                <Input
                    min="0"
                    step="any"
                    type="number"
                    placeholder="Podaj powierzchnię(ha)"
                    title="Powierzchnia(ha)"
                    error={errors.area}
                    handleChange={(e) => setFieldData((prev) => ({...prev, area:e.target.value}))}
                    value={fieldData.area}
                />
            </section>
            <button type="button" className="primary-btn" onClick={handleSubmit}><FontAwesomeIcon icon={faPlus}/> Dodaj</button>
        </section>
    )
}

export default InsertArea;