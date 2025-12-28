import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteConfirmStore, useUpdateDataStore } from "../../hooks/stores";

const User = ({data, number, onDelete, onUpdate, onPaswordUpdate}) => {

    const updateDeleteConfirm = useDeleteConfirmStore((state) => state.update);
    const updateUpdateData = useUpdateDataStore((state) => state.update);

    return (
        <section className="flex justify-between p-5 border-3 m-1 items-center">
            <section className="flex justify-start">
                { number && <h1 className="mr-4 font-bold text-2xl">{number}#</h1>}
                <h2 className="text-2xl">{data.name} {data.surname}</h2>
                <p className="text-2xl ml-10 font-bold">{data.role}</p>
            </section>
            <section className="flex justify-around items-center gap-x-3">
                <button className="edit-btn" onClick={() => {
                        updateUpdateData({...data, number})
                        onUpdate()
                    }}>
                    <FontAwesomeIcon icon={faPen}/> Edytuj
                </button>
                <button className="edit-btn" onClick={() => {
                    updateUpdateData({number, id:data.id})
                    onPaswordUpdate()
                }}>
                    <FontAwesomeIcon icon={faPen}/> Zmień hasło
                </button>
                <button className="error-btn" onClick={() => updateDeleteConfirm(true, () => onDelete(data.id))}>
                    <FontAwesomeIcon icon={faTrashCan}/> Usuń
                </button>
            </section>
        </section>
    )
}

export default User;