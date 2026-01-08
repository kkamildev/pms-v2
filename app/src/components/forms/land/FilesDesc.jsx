import { faFileCirclePlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteConfirmStore, useUpdateDataStore } from "../../../hooks/stores";
import useApi from "../../../hooks/useApi";
import { useRef } from "react";
import ErrorBox from "../../popups/ErrorBox";
import RoleRequired from "../../nav/RoleRequired"

const FilesDesc = ({onClose, reload}) => {

    const {post, deleteReq} = useApi();

    const filesUploadRef = useRef(null);

    const landData = useUpdateDataStore((state) => state.data);
    const updateLandData = useUpdateDataStore((state) => state.update);
    const updateDeleteConfirm = useDeleteConfirmStore((state) => state.update);

    const insertFile = (e) => {
        const formData = new FormData();
        for (const file of e.target.files) {
            formData.append("files", file);
        }
        if(e.target.files.length) {
            post(`/api/files/upload/${landData.id}`, formData, (res) => {
                const files = res.data.files;
                updateLandData({...landData, files:[...landData.files, ...(files.map((obj) => obj.originalname))]})
            });
        }
    }

    const handleDelete = (filename) => {
        deleteReq("/api/files/delete", {idLand:landData.id, filename}, (res) => {
            updateLandData({...landData, files:[...landData.files.filter((obj) => obj !== filename)]})
        })
    }


    return (
        <section className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center scroll-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <ErrorBox/>
            <h1 className="text-2xl font-bold">Pliki działki</h1>
            <p className="text-2xl">Nr {landData.number}</p>
            <RoleRequired roles={["SEKRETARIAT"]}>
                <input ref={filesUploadRef} type="file" multiple hidden onChange={insertFile} />
                <button className="my-1 primary-btn" onClick={() => filesUploadRef.current.click()}>
                    <FontAwesomeIcon icon={faFileCirclePlus}/> Wybierz pliki
                </button>
            </RoleRequired>
            <section className="my-3 self-start flex flex-col w-full">
                {
                    landData.files.map((obj, index) =>
                        <section key={index} className="flex gap-x-1 items-center justify-between w-full">
                            <a href={`/api/files/get/${landData.id}/${obj}`} target="_blank" className="p-2 flex-1 text-black font-bold hover:text-white hover:bg-green-700 m-1 transition-colors duration-100 ease-in-out">
                                {obj}
                            </a>
                            <RoleRequired roles={["SEKRETARIAT"]}>
                                <button className="error-btn" onClick={() => updateDeleteConfirm(true, () => handleDelete(obj))}><FontAwesomeIcon icon={faTrashCan}/></button>
                            </RoleRequired>
                        </section> 
                    )
                }
            </section>
        </section>
    )
}

export default FilesDesc;