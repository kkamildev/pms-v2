
import { useEffect, useState } from "react";

import Select from "../../inputs/Select"
import Input from "../../inputs/Input"
import useFormFields from "../../../hooks/useFormFields"
import useApi from "../../../hooks/useApi"
import { useUserStore } from "../../../hooks/stores";


const LoginUser = () => {
    const {get, post} = useApi();
    const auth = useUserStore((state) => state.auth)
    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"idUser",
            allowNull:false
        },
        {
            name:"password",
            allowNull:false
        }
    ]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        get("/api/users/get-all", (res) => setUsers(res.data.users));
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidated()) {
            post("/api/users/login-user", fieldData, (res) => auth(),
             (err) => setErrors((prev) => ({...prev, password:err.error})));
        }
        
    }
    return (
        <form method="POST" onSubmit={handleSubmit} className="flex justify-center flex-col items-center border-3 xl:w-[40%] lg:w-[60%] w-[90%] p-2 rounded-xl m-5">
            <h1 className="font-bold text-3xl text-center mt-10">Logowanie jako</h1>
            <section className="py-5 w-[50%] flex flex-col gap-y-5">
                <Select
                    defaultOption="Wybierz użytkownika"
                    title="Użytkownik"
                    error={errors.idUser}
                    options={users.map(obj => <option key={obj.id} value={obj.id}>{obj.name} {obj.surname} {obj.role}</option>)}
                    handleChange={(e) => setFieldData((prev) => ({...prev, idUser:e.target.value}))}
                    value={fieldData.idUser}
                />
                {
                    fieldData.idUser &&
                    <Input
                        type="password"
                        placeholder="Podaj hasło"
                        title="Hasło"
                        error={errors.password}
                        handleChange={(e) => setFieldData((prev) => ({...prev, password:e.target.value}))}
                        value={fieldData.password}
                    />
                }
            </section>
            <section className="my-4">
                <button type="submit" className="primary-btn text-2xl">
                    Zaloguj się
                </button>
            </section>
        </form>
    )
}

export default LoginUser;