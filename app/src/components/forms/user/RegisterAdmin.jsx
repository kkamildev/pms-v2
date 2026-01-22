

import Input from "../../inputs/Input"
import useFormFields from "../../../hooks/useFormFields"
import useApi from "../../../hooks/useApi"
import { useUserStore } from "../../../hooks/stores";
import Form from "../../inputs/Form"


const RegisterAdmin = () => {
    const {post} = useApi();
    const auth = useUserStore((state) => state.auth)
    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"name",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długie"
        },
        {
            name:"surname",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długie"
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

    const handleSubmit = async (e) => {
        let idUser;
        if(isValidated()) {
            if(fieldData.password === fieldData.repeatedPassword) {
                await post("/api/users/register-admin", fieldData, (res) => idUser = res.data.idUser, (err) => {
                    setErrors((prev) => ({...prev, name:err.error}))
                });
                post("/api/users/login-user", {idUser, password:fieldData.password}, (res) => auth());
            } else {
                setErrors((prev) => ({...prev, repeatedPassword:"Hasła nie są takie same"}));
            }
        }
        
    }
    return (
        <Form onSubmit={handleSubmit} className="flex justify-center flex-col items-center border-3 xl:w-[40%] lg:w-[60%] w-[90%] p-2 rounded-xl m-5">
            <h1 className="font-bold text-3xl text-center mt-10">Rejestracja ADMINA</h1>
            <section className="py-5 w-[50%] flex flex-col gap-y-5">
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
                <Input
                    type="password"
                    placeholder="Podaj hasło"
                    title="Hasło"
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
            <section className="my-4">
                <button type="submit" className="primary-btn text-2xl">
                    Zarejestruj się
                </button>
            </section>
        </Form>
    )
}

export default RegisterAdmin;