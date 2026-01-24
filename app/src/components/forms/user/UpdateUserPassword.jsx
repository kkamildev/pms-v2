import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../inputs/Form"
import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import useApi from "../../../hooks/useApi";
import { useUpdateDataStore } from "../../../hooks/stores";


const UpdateUserPassword = ({onClose = () => {}, reload = () => {}}) => {
    const {put} = useApi();
    const userData = useUpdateDataStore((state) => state.data);
    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
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
                put("/api/users/update-password", {idUser:userData.id, password:fieldData.password}, (res) => {
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
            <h1 className="text-2xl font-bold">Zmiana hasła użytkownika</h1>
            <h2 className="text-2xl font-bold">Nr {userData.number}</h2>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
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
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
        </Form>
    )
}

export default UpdateUserPassword;