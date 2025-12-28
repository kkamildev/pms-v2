
import { useEffect, useState } from "react";
import Title from "../nav/Title"
import useApi from "../../hooks/useApi"
import User from "../models/User"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InsertUser from "../forms/user/InsertUser";
import { useUserStore } from "../../hooks/stores";
import UpdateUser from "../forms/user/UpdateUser";
import UpdateUserPassword from "../forms/user/UpdateUserPassword";

const UsersDisplay = ({authorize}) => {
    const {get, deleteReq} = useApi();
    const user = useUserStore((state) => state.user);
    const [users, setUsers] = useState([]);
    const [formName, setFormName] = useState(null);


    const getUsers = () => {
        get("/api/users/get-all", (res) => setUsers(res.data.users))
    }

    const handleDelete = async (id) => {
        await deleteReq("/api/users/delete", {idUser:id}, (res) => setUsers((prev) => [...prev.filter((obj) => obj.id != id)]))
        if(id == user.id) {
            get("/api/users/logout", (res) => authorize());
        }
    }

    useEffect(() => {
        getUsers()
    }, []);
    return (
        <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Użytkownicy"}/>
            <section className="flex flex-col w-full p-5">
                <section className="flex items-center gap-x-5">
                    <h1 className="text-4xl font-bold">Użytkownicy</h1>
                    <button className="primary-btn" onClick={() => setFormName("insert")}>
                        <FontAwesomeIcon icon={faUser}/> Dodaj nowego użytkownika
                    </button>
                </section>
                <h2 className="text-3xl font-bold ml-5 mt-2">Znaleziono: {users.length}</h2>
                <section className="my-5">
                    {
                        users.map((obj, index) => <User
                                                        data={obj}
                                                        key={obj.id}
                                                        number={index + 1}
                                                        onDelete={handleDelete}
                                                        onUpdate={() => setFormName("update")}
                                                        onPaswordUpdate={() => setFormName("updatePassword")}
                                                    />)
                    }
                </section>
            </section>
            {
                formName == "insert" && <InsertUser onClose={() => setFormName(null)} reload={getUsers}/>
            }
            {
                formName == "update" && <UpdateUser onClose={() => setFormName(null)} reload={getUsers}/>
            }
            {
                formName == "updatePassword" && <UpdateUserPassword onClose={() => setFormName(null)} reload={getUsers}/>
            }
        </section>
    )
}

export default UsersDisplay;