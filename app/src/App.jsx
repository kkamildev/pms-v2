
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import useApi from "./hooks/useApi";
import { useUserStore } from "./hooks/stores";
import DashboardPage from "./pages/DashboardPage";


const App = () => {
    const {get} = useApi();
    const updateUser = useUserStore((state) => state.update);
    const setAuthorization = useUserStore((state) => state.setAuth);

    const [auth, setAuth] = useState(true);
    const [ready, setReady] = useState(false);

    const authorize = async () => {
        await get("/api/users/auth", (res) => {
            updateUser(res.data.user)
            setAuth(true);
        }, (err) => {
            if(err.unauthorized) {
                setAuth(false);
            }
        });
        if(!ready) {
            setReady(true);
        }
    }
    useEffect(() => {
        authorize();
        setAuthorization(authorize);
    }, []);
    return (
        ready ?
            auth ? <DashboardPage/> : <MainPage/>
        :
            <></>
    )
}

export default App;