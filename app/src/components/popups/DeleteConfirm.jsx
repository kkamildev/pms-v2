import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteConfirmStore } from "../../hooks/stores";

const DeleteConfirm = () => {
    const active = useDeleteConfirmStore((state) => state.active);
    const onConfirm = useDeleteConfirmStore((state) => state.onConfirm);
    const onCancel = useDeleteConfirmStore((state) => state.onCancel);

    return (
        active &&
        <section className="absolute w-full h-full bg-black/80 flex flex-col justify-center items-center gap-y-10">
            <FontAwesomeIcon icon={faTrashCan} className="text-red-700 text-6xl"/>
            <h1 className="text-5xl font-bold text-red-700 text-center">Potwierdzenie usunięcia</h1>
            <section className="flex gap-x-6">
                <button className="error-btn text-3xl" onClick={onCancel}><FontAwesomeIcon icon={faXmark}/> odmowa</button>
                <button className="primary-btn text-3xl" onClick={() => {
                    onCancel()
                    onConfirm()
                }}><FontAwesomeIcon icon={faXmark}/> zgoda</button>
            </section>
        </section>
    )
}

export default DeleteConfirm;