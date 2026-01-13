import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import LoginUser from "../components/forms/user/LoginUser"
import useApi from "../hooks/useApi";
import ErrorBox from "../components/popups/ErrorBox";
import RegisterAdmin from "../components/forms/user/RegisterAdmin";

const MainPage = () => {
    const [registered, setRegistered] = useState(true);
    const {get} = useApi();

    useEffect(() => {
        get("/api/users/get-all", (res) => setRegistered([...res.data.users].some((value) => value.role == "ADMIN")));
    }, []);
    
    return (
        <MainLayout>
            <ErrorBox/>
            {
                registered ? <LoginUser/> : <RegisterAdmin/>
            }
        </MainLayout>
    )
}

export default MainPage;