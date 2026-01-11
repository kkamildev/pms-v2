import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleRequired from "../nav/RoleRequired";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteConfirmStore, useUpdateDataStore } from "../../hooks/stores";

const Renter = ({data, number, onDelete, onUpdate}) => {

    const updateDeleteConfirm = useDeleteConfirmStore((state) => state.update);
    const updateUpdateData = useUpdateDataStore((state) => state.update);

    return (
        <section className="flex justify-between p-5 border-3 m-1 items-center">
            <section className="flex justify-start">
                { number && <h1 className="mr-4 font-bold text-2xl">{number}#</h1>}
                <section className="flex gap-x-2">
                    <h2 className="text-2xl font-bold">{data.name}</h2>
                    <h2 className="text-2xl font-bold">{data.phone.match(/.{3}/g).join(" ")}</h2>
                    <p className="text-2xl">Umowy dzierżawy: {data.rents.length}</p>
                </section>
            </section>
            <section className="flex justify-around items-center gap-x-3">
                <button className="edit-btn" onClick={() => {
                            updateUpdateData({...data, number})
                            onUpdate()
                        }}>
                        <FontAwesomeIcon icon={faPen}/> Edytuj
                </button>
                <RoleRequired roles={["ADMIN"]}>
                    <button className="error-btn" onClick={() => updateDeleteConfirm(true, () => onDelete(data.id))}>
                        <FontAwesomeIcon icon={faTrashCan}/> Usuń
                    </button>
                </RoleRequired>
            </section>
            
        </section>
    )
}

export default Renter;