import { faEye, faFolderOpen, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteConfirmStore, useUpdateDataStore } from "../../hooks/stores";
import { useState } from "react";


const Land = ({data, number, onDelete, onUpdate, onShowFiles}) => {

    const updateDeleteConfirm = useDeleteConfirmStore((state) => state.update);
    const updateUpdateData = useUpdateDataStore((state) => state.update);

    const [more, setMore] = useState(false);

    return (
        <section className="flex flex-col gap-y-2 p-5 mb-5 border-3">
            <section className="flex items-center justify-between">
                <section className="flex gap-x-5 items-center">
                    <h1 className="font-bold text-2xl">#{number}</h1>
                    <h1 className="text-xl">{data.serialNumber || "Brak numeru seryjnego działki"}</h1>
                </section>
                <section className="flex gap-x-3 items-center">
                    <button className="primary-btn" onClick={() => setMore((prev) => !prev)}>
                        <FontAwesomeIcon icon={faEye}/> {more ? "Mniej" : "Więcej"}
                    </button>
                    <button className="file-btn" onClick={() => {
                            updateUpdateData({files:data.files || [], id:data.id, number})
                            onShowFiles()
                        }}>
                        <FontAwesomeIcon icon={faFolderOpen}/> Pliki
                    </button>
                    <button className="edit-btn" onClick={() => {
                            updateUpdateData({...data, number})
                            onUpdate()
                        }}>
                        <FontAwesomeIcon icon={faPen}/> Edytuj
                    </button>
                    <button className="error-btn" onClick={() => updateDeleteConfirm(true, () => onDelete(data.id))}>
                        <FontAwesomeIcon icon={faTrashCan}/> Usuń
                    </button>
                </section>
            </section>
            <section className="flex gap-x-5">
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Nr</span>
                    <p>{data.landNumber}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Powierzchnia</span>
                    <p>{data.area}ha</p>
                </div>
                <section className="flex gap-x-8 ml-6">
                    <div className="flex-col text-center flex items-center text-xl mr-3">
                        <span className="font-bold">Miejscowość</span>
                        <p>{data.town.name}</p>
                    </div>
                    <div className="flex-col text-center flex items-center text-xl mr-3">
                        <span className="font-bold">Lokalizacja</span>
                        <p>{data.town.location.commune}, {data.town.location.district}, {data.town.location.province}</p>
                    </div>
                </section>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Właściciel</span>
                    <p>{data.owner.name}</p>
                    <p>{data.owner.phone || "Brak tel"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Dzierżawiona</span>
                    <p>{data.rent ? "Tak" : "Nie"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Przeznaczenie</span>
                    <p>{data.landPurpose ? data.landPurpose.type : "Brak"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Rodzaj</span>
                    <p>{data.landType ? data.landType.type : "Brak"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">MPZP</span>
                    <p>{data.mpzp ? data.mpzp.code : "Brak"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Plan ogól.</span>
                    <p>{data.generalPlan ? data.generalPlan.code : "Brak"}</p>
                </div>
            </section>
            {
                more &&
                <>
                    <section className="flex gap-x-5">
                        <div className="flex-col text-center flex items-center text-xl">
                            <span className="font-bold">Nr księgi wieczystej</span>
                            <p>{data.registerNumber || "Brak"}</p>
                        </div>
                        <div className="flex-col text-center flex items-center text-xl">
                            <span className="font-bold">Hipoteka</span>
                            <p>{data.mortgage ? "Tak" : "Nie"}</p>
                        </div>
                        <div className="flex-col text-center flex items-center text-xl">
                            <span className="font-bold">Spółka wodna</span>
                            <p>{data.waterCompany ? "Tak" : "Nie"}</p>
                        </div>
                        <div className="flex-col text-center flex items-center text-xl">
                            <span className="font-bold">Podatek od nieruchomości</span>
                            <p>{data.propertyTax ? "Tak" : "Nie"}</p>
                        </div>
                        <div className="flex flex-col h-full text-xl items-center gap-x-3 flex-1">
                            <span className="font-bold">Opis</span>
                            <p>{data.description || "Brak"}</p>
                        </div>
                    </section>
                    {
                        data.rent &&
                        <section className="flex gap-x-5 items-center justify-center">
                            <h1 className="font-bold text-zinc-600 text-3xl">Dane dzierżawy</h1>
                        </section>
                    }
                    <section className="flex flex-col gap-x-5 items-center justify-center">
                        <h1 className="font-bold text-zinc-600 text-2xl self-center">Dane Nabycia</h1>
                        <section className="flex gap-x-5 w-full">
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Data nabycia</span>
                                <p>{data.purchase.date || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Nr aktu nabycia</span>
                                <p>{data.purchase.actNumber || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Od kogo</span>
                                <p>{data.purchase.seller || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Cena(zł) nabycia</span>
                                <p>{data.purchase.price ? data.purchase.price + "zł" : "Brak"}</p>
                            </div>
                        </section>
                    </section>
                    <section className="flex flex-col gap-x-5 items-center justify-center">
                        <h1 className="font-bold text-zinc-600 text-2xl self-center">Dane Sprzedaży</h1>
                        <section className="flex gap-x-5 w-full">
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Data sprzedaży</span>
                                <p>{data.sell.date || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Nr aktu sprzedaży</span>
                                <p>{data.sell.actNumber || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Komu</span>
                                <p>{data.sell.buyer || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-xl flex-1">
                                <span className="font-bold">Cena(zł) sprzedaży</span>
                                <p>{data.sell.price ? data.sell.price + "zł" : "Brak"}</p>
                            </div>
                        </section>
                    </section>
                </>
            }
        </section>
    )
}

export default Land;