
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useApi from "../../../hooks/useApi";
import Input from "../../inputs/Input";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import useFormFields from "../../../hooks/useFormFields";

const InsertRenter = ({onInsert = (renter) => {}}) => {
    const {post} = useApi();

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

    const handleSubmit = () => {
        if(isValidated()) {
            post("/api/renters/insert", {...fieldData}, (res) => {
                onInsert({id:res.data.idRenter, ...fieldData});
                setFieldData({});
                setErrors({});
            });
        }
    }
    return (
        <section className="border-3 p-5 flex flex-col items-center scroll-auto">
            <h1 className="text-2xl font-bold text-center">Dodawanie dzierżawcy do systemu</h1>
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
            <button type="button" className="primary-btn" onClick={handleSubmit}><FontAwesomeIcon icon={faPlus}/> Dodaj</button>
        </section>
    )
}

export default InsertRenter;