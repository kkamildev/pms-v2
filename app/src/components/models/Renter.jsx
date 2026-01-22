import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleRequired from "../nav/RoleRequired";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteConfirmStore, useUpdateDataStore } from "../../hooks/stores";
import {DateTime} from "luxon"

const Renter = ({data, number, onDelete, onUpdate, onRentDelete, onRentUpdate}) => {


    const updateDeleteConfirm = useDeleteConfirmStore((state) => state.update);
    const updateUpdateData = useUpdateDataStore((state) => state.update);

    return (
        <section className="flex flex-col justify-start border-3 m-1">
            <section className="flex justify-between p-5 items-center">
                <section className="flex justify-start">
                    { number && <h1 className="mr-4 font-bold text-2xl">{number}#</h1>}
                    <section className="flex gap-x-2">
                        <h2 className="text-2xl font-bold">{data.name}</h2>
                        <h2 className="text-2xl font-bold">{data.phone.match(/.{3}/g).join(" ")}</h2>
                        <p className="text-2xl ml-5 text-zinc-700 font-bold">Umowy dzierżawy: {data.rents.length}</p>
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
            {
                data.rents.length != 0 &&
                <section className="m-1 px-5 flex justify-start items-center">
                    <h2 className="font-bold text-xl">Suma czynszu: {data.rents.reduce((acc, obj) => acc + (obj.land.area * obj.rental), 0)}zł</h2>
                </section>
            }
            {
                data.rents.length != 0 &&
                <section className="m-3">
                    {
                        data.rents.map((obj, index) =>
                        <section key={obj.id} className="flex flex-col gap-y-2 p-2 mb-5">
                            <section className="flex justify-between items-center w-full">
                                <h1 className="text-xl"><strong>ID działki: </strong>{obj.land.serialNumber || "Brak"}</h1>
                                <section className="flex gap-x-3">
                                    <button className="edit-btn" onClick={() => {
                                            updateUpdateData({...obj, renter:{name:data.name, phone:data.phone}})
                                            onRentUpdate()
                                        }}>
                                        <FontAwesomeIcon icon={faPen}/> Edytuj
                                    </button>
                                    <RoleRequired roles={["ADMIN"]}>
                                        <button className="error-btn" onClick={() => updateDeleteConfirm(true, () => onRentDelete(obj.id))}>
                                            <FontAwesomeIcon icon={faTrashCan}/> Usuń
                                        </button>
                                    </RoleRequired>
                                </section>
                            </section>
                            <h1 className="text-xl"><strong>Data rozpoczęcia/zakończenia dzierżawy: </strong>{DateTime.fromISO(obj.startDate).toFormat("dd.MM.yyyy")} - {DateTime.fromISO(obj.endDate).toFormat("dd.MM.yyyy")}
                            <span className="text-2xl font-bold text-red-700 ml-3">{DateTime.fromISO(obj.endDate).diffNow().toMillis() < 0 && "Umowa przedawniona!"}</span>
                            </h1>
                            <section className="flex gap-x-8">
                                <div className="flex-col text-center flex items-center text-xl">
                                    <span className="font-bold">Stawka czynszu</span>
                                    <p>{obj.rental}zł/ha</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl">
                                    <span className="font-bold">Czynsz</span>
                                    <p>{(obj.land.area * obj.rental).toFixed(2)}zł</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl">
                                    <span className="font-bold">Data wystawienia faktury czynszowej</span>
                                    <p>{DateTime.fromISO(obj.issueRentalFactureDate).toFormat("dd.MM")}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl">
                                    <span className="font-bold">Właściciel działki</span>
                                    <p>{obj.land.owner.name}</p>
                                    <p>{obj.land.owner.phone || "Brak tel"}</p>
                                </div>
                                <section className="flex gap-x-8 ml-6">
                                    <div className="flex-col text-center flex items-center text-xl mr-3">
                                        <span className="font-bold">Miejscowość</span>
                                        <p>{obj.land.town.name}</p>
                                    </div>
                                    <div className="flex-col text-center flex items-center text-xl mr-3">
                                        <span className="font-bold">Lokalizacja</span>
                                        <p>{obj.land.town.location.commune}, {obj.land.town.location.district}, {obj.land.town.location.province}</p>
                                    </div>
                                </section>
                            </section>
                        </section>)
                    }
                </section>
            }
        </section>
    )
}

export default Renter;