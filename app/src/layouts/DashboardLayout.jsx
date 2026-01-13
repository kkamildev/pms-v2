
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/nav/Navbar"
import { useUserStore } from "../hooks/stores";
import useApi from "../hooks/useApi";
import DeleteConfirm from "../components/popups/DeleteConfirm";

const DashboardLayout = ({children}) => {

    const user = useUserStore((state) => state.user);
    const auth = useUserStore((state) => state.auth)
    const {get} = useApi();

    const logout = () => {
        get("/api/users/logout", (res) => auth());
    }

    return (
        <section className="flex flex-col h-screen max-h-screen overflow-hidden">
            <header className="bg-green-700 flex p-2 items-center gap-5">
                <section className="p-1 bg-white rounded-xl">
                    <img src="/PMS-V2.png" alt="PMS - logo" width={50}/>
                </section>
                <section className="flex justify-between w-full items-center">
                    <section className="p-1 text-white font-bold text-2xl">
                        <p>Zalogowano jako: <span className="font-extrabold">{user.name} {user.surname} {user.role}</span></p>
                    </section>
                    <section>
                        <button className="secondary-btn text-2xl" onClick={logout}>Wyloguj się</button>
                    </section>
                </section>
            </header>
            <BrowserRouter>
                <section className="flex w-full justify-between items-center flex-1 min-h-0">
                    <Navbar/>
                    <main className="flex flex-col w-full h-full relative">
                        <DeleteConfirm/>
                        {children}
                    </main>
                </section>
            </BrowserRouter>
        </section>
    )
}

export default DashboardLayout;