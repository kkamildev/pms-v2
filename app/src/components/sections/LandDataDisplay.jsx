import { useParams } from "react-router-dom";
import Title from "../nav/Title";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import {DateTime} from "luxon"
import Area from "../models/Area"

const LandDataDisplay = () => {

    const {get} = useApi();

    const {id} = useParams();

    const [land, setLand] = useState(null);

    useEffect(() => {
        get("/api/lands/get-one?idLand=" + id, (res) => {
            setLand(res.data.land)
        }, (err) => {});
    }, [id]);

    return (
        <section className="flex justify-between h-full">
            <section className="flex flex-col w-full p-5 overflow-y-auto">
                {
                    land ? <>
                        <Title title={`Działka: ${land.serialNumber}`}/>
                        <h1 className="text-3xl font-bold text-center my-3">ID działki: {land.serialNumber}</h1>
                        <section className="flex gap-x-5 justify-center mt-5">
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Nr</span>
                                <p>{land.landNumber}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Powierzchnia</span>
                                <p>{land.area}ha</p>
                            </div>
                            <section className="flex gap-x-8 ml-6">
                                <div className="flex-col text-center flex items-center text-2xl mr-3">
                                    <span className="font-bold">Miejscowość</span>
                                    <p>{land.town.name}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-2xl mr-3">
                                    <span className="font-bold">Lokalizacja</span>
                                    <p>{land.town.location.commune}, {land.town.location.district}, {land.town.location.province}</p>
                                </div>
                            </section>
                        </section>
                        <section className="flex gap-x-5 justify-center mt-5">
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Właściciel</span>
                                <p>{land.owner.name}</p>
                                <p>{land.owner.phone || "Brak tel"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Dzierżawca</span>
                                <p>{land.rent ? land.rent.renter.name : "Brak"}</p>
                                <p>{land.rent && (land.rent.renter.phone ? land.rent.renter.phone : "Brak tel")}</p>
                            </div>
                        </section>
                        <section className="flex gap-x-5 justify-center mt-5">
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Przeznaczenie</span>
                                <p>{land.landPurpose ? land.landPurpose.type : "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Rodzaj</span>
                                <p>{land.landType ? land.landType.type : "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">MPZP</span>
                                <p>{land.mpzp ? land.mpzp.code : "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Plan ogólny</span>
                                <p>{land.generalPlan ? land.generalPlan.code : "Brak"}</p>
                            </div>
                        </section>
                        <section className="flex gap-x-5 justify-center mt-5">
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Nr księgi wieczystej</span>
                                <p>{land.registerNumber || "Brak"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Hipoteka</span>
                                <p>{land.mortgage ? "Tak" : "Nie"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Spółka wodna</span>
                                <p>{land.waterCompany ? "Tak" : "Nie"}</p>
                            </div>
                            <div className="flex-col text-center flex items-center text-2xl">
                                <span className="font-bold">Podatek od nieruchomości</span>
                                <p>{land.propertyTax ? "Tak" : "Nie"}</p>
                            </div>
                        </section>
                        <div className="flex flex-col text-2xl items-center text-center gap-x-3">
                            <span className="font-bold">Opis</span>
                            <p className="w-[50%]">{land.description || "Brak"}</p>
                        </div>
                        <section className="flex flex-col gap-x-5 items-center justify-center mt-5">
                            <h1 className="font-bold text-zinc-600 text-3xl text-center">Dane dzierżawy</h1>
                            {
                                land.rent ?
                                <section className="flex gap-x-5 w-full">
                                    <div className="flex-col text-center flex items-center text-2xl flex-1">
                                        <span className="font-bold">Okres dzierżawy</span>
                                        <p>{DateTime.fromISO(land.rent.startDate).toFormat("dd.MM.yyyy")} - {DateTime.fromISO(land.rent.endDate).toFormat("dd.MM.yyyy")}</p>
                                    </div>
                                    <div className="flex-col text-center flex items-center text-2xl flex-1">
                                        <span className="font-bold">Stawka czynszu</span>
                                        <p>{land.rent.rental}zł/ha</p>
                                    </div>
                                    <div className="flex-col text-center flex items-center text-2xl flex-1">
                                        <span className="font-bold">Czynsz</span>
                                        <p>{land.rent.rental * land.area}zł</p>
                                    </div>
                                </section>
                                :
                                <h2 className="text-2xl my-3">Brak danych o dzierżawie</h2>
                            }
                        </section>
                        <section className="flex flex-col gap-x-5 items-center justify-center">
                            <h1 className="font-bold text-zinc-600 text-3xl self-center">Dane Nabycia</h1>
                            <section className="flex gap-x-5 w-full">
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Data nabycia</span>
                                    <p>{land.purchase.date ? DateTime.fromISO(land.purchase.date).toFormat("dd.MM.yyyy") : "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Nr aktu nabycia</span>
                                    <p>{land.purchase.actNumber || "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Sprzedający</span>
                                    <p>{land.purchase.seller || "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Cena(zł) nabycia</span>
                                    <p>{land.purchase.price ? land.purchase.price + "zł" : "Brak"}</p>
                                </div>
                            </section>
                        </section>
                        <section className="flex flex-col gap-x-5 items-center justify-center">
                            <h1 className="font-bold text-zinc-600 text-3xl self-center">Dane Sprzedaży</h1>
                            <section className="flex gap-x-5 w-full">
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Data sprzedaży</span>
                                    <p>{land.sell.date ? DateTime.fromISO(land.sell.date).toFormat("dd.MM.yyyy") : "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Nr aktu sprzedaży</span>
                                    <p>{land.sell.actNumber || "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Kupujący</span>
                                    <p>{land.sell.buyer || "Brak"}</p>
                                </div>
                                <div className="flex-col text-center flex items-center text-xl flex-1">
                                    <span className="font-bold">Wartość(zł) sprzedaży</span>
                                    <p>{land.sell.price ? land.sell.price + "zł" : "Brak"}</p>
                                </div>
                            </section>
                        </section>
                    <section className="flex flex-col gap-x-5 items-center justify-center">
                        {
                            land.areas.length ?
                                <>
                                    <h1 className="font-bold text-zinc-600 text-3xl self-center">Klasy gruntu</h1>
                                    <section className="flex gap-x-5 w-full justify-around mt-3 text-xl"> 
                                        {
                                            land.areas.reduce((acc, value) => value.area + acc, 0) - land.area == 0 ?
                                            <h1 className="font-bold text-green-700 text-center">Zgodność powierzchni</h1>
                                            :
                                            <h1 className="font-bold text-red-800 text-center">Różnica(ha): {land.areas.reduce((acc, value) => value.area + acc, 0) - land.area}</h1>
                                        }
                                        {
                                            land.town.location.taxDistrict ?
                                            <h1 className="font-bold text-green-700 text-center">Okręg podatkowy: {["I", "II", "III", "IV"][land.town.location.taxDistrict - 1]}</h1>
                                            :
                                            <h1 className="font-bold text-red-800 text-center">Brak okręgu podatkowego</h1>
                                        }
                                        {
                                            land.town.location.agriculturalTax ?
                                            <h1 className="font-bold text-green-700 text-center">Staw. podatku roln.: {land.town.location.agriculturalTax}zł/ha przel.</h1>
                                            :
                                            <h1 className="font-bold text-red-800 text-center">Brak podatku roln.</h1>
                                        }
                                        {
                                            land.town.location.forestTax ?
                                            <h1 className="font-bold text-green-700 text-center">Staw. podatku leśn.: {land.town.location.forestTax}zł/ha</h1>
                                            :
                                            <h1 className="font-bold text-red-800 text-center">Brak podatku leśn.</h1>
                                        }
                                    </section>
                                    <section className="flex flex-col gap-x-5 items-start justify-center m-3 w-full">
                                        {
                                            land.areas.map((obj, index) => <Area key={obj.id}
                                                data={obj}
                                                number={index + 1}
                                                taxDistrict={land.town.location.taxDistrict || null}
                                                forestTax={land.town.location.forestTax || null}
                                                agriculturalTax={land.town.location.agriculturalTax || null}
                                            />)
                                        }
                                    </section>
                                </>
                            :
                            <h1 className="font-bold text-zinc-600 text-2xl self-center">Brak podziału na klasy gruntu</h1>
                        }
                    </section>
                </>
                    :
                    <section className="flex flex-col justify-center h-full">
                        <Title title={`Działki nie znaleziono`}/>
                        <h1 className="text-5xl text-center font-bold ml-5 mt-2">Taka działka nie istnieje</h1>
                        <h2 className="text-4xl text-center font-bold ml-5 mt-2">404</h2>
                    </section>
                }
            </section>
        </section>
    )
}

export default LandDataDisplay;