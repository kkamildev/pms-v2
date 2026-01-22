import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import Select from "../../inputs/Select";
import useApi from "../../../hooks/useApi";


const InsertUser = ({onClose = () => {}, reload = () => {}}) => {

    const {post} = useApi();

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
        {
            name:"password",
            allowNull:false,
            regexp:/^.{8,}$/,
            errorText:"Za słabe"
        },
        {
            name:"repeatedPassword",
            allowNull:false
        }
    ]);

    const handleSubmit = (e) => {
        if(isValidated()) {
            if(fieldData.password === fieldData.repeatedPassword) {
                post("/api/users/insert", {...fieldData, repeatedPassword:null}, (res) => {
                    onClose()
                    reload()
                })
            } else {
                setErrors((prev) => ({...prev, repeatedPassword:"Hasła nie są takie same"}));
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center scroll-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Dodaj użytkownika</h1>
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
                <Input
                    type="password"
                    placeholder="Podaj nowe hasło"
                    title="Nowe hasło"
                    error={errors.password}
                    handleChange={(e) => setFieldData((prev) => ({...prev, password:e.target.value}))}
                    value={fieldData.password}
                />
                <Input
                    type="password"
                    placeholder="Powtórz hasło"
                    title="Powtórz hasło"
                    error={errors.repeatedPassword}
                    handleChange={(e) => setFieldData((prev) => ({...prev, repeatedPassword:e.target.value}))}
                    value={fieldData.repeatedPassword}
                />
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPlus}/> Dodaj</button>
        </Form>
    )
}

export default InsertUser;