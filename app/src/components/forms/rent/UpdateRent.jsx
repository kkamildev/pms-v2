
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorBox from "../../popups/ErrorBox";
import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUpdateDataStore } from "../../../hooks/stores";
import useFormFields from "../../../hooks/useFormFields";
import Input from "../../inputs/Input";
import TipSelect from "../../inputs/TipSelect";
import { useEffect, useState } from "react";
import InsertRenter from "../rent/InsertRenter"
import useApi from "../../../hooks/useApi";
import Select from "../../inputs/Select";
import {DateTime} from "luxon";
import Form from "../../inputs/Form"

const UpdateRent = ({onClose = () => {}, reload = () => {}}) => {

    const {get, put} = useApi();

    const rentData = useUpdateDataStore((state) => state.data);

    const [renters, setRenters] = useState([]);


    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"idRenter",
            allowNull:false,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"startDate",
            allowNull:false,
        },
        {
            name:"endDate",
            allowNull:false,
        },
        {
            name:"rental",
            allowNull:false,
            regexp:/^\d{0,7}$/,
            errorText:"Nie poprawny lub za duży"
        },
        {
            name:"issueRentalFactureMonth",
            allowNull:false,
        },
        {
            name:"issueRentalFactureDay",
            allowNull:false,
        },
    ]);

    useEffect(() => {
        const func = async () => {
            if(renters.length == 0) await get("/api/renters/get-all", (res) => setRenters(res.data.renters));
            setFieldData({
                idRenter:rentData.idRenter,
                startDate:DateTime.fromISO(rentData.startDate).toFormat("yyyy-MM-dd"),
                endDate:DateTime.fromISO(rentData.endDate).toFormat("yyyy-MM-dd"),
                rental:`${rentData.rental}`,
                issueRentalFactureMonth:DateTime.fromISO(rentData.issueRentalFactureDate).month,
                issueRentalFactureDay:DateTime.fromISO(rentData.issueRentalFactureDate).day
            })
        }
        func()
    }, [rentData]);


    const handleSubmit = (e) => {
        if(isValidated()) {
            const date = new Date(2000, fieldData.issueRentalFactureMonth - 1, fieldData.issueRentalFactureDay);
            put("/api/rents/update", {...fieldData, issueRentalFactureDate:DateTime.fromJSDate(date).toFormat("yyyy-MM-dd"),
                 idRent:rentData.id}, (res) => {
                onClose()
                reload()
            });
        }
    }

    return (
        <section className="w-full flex justify-center items-start overflow-auto">
            <Form onSubmit={handleSubmit} className="min-w-[43%] p-5 flex flex-col items-center justify-center">
                <ErrorBox/>
                <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
                <h1 className="text-2xl font-bold">Edycja dzierżawy dzierżawcy</h1>
                <h2 className="text-xl font-bold mt-2">{rentData.renter.name} {rentData.renter.phone.match(/.{3}/g).join(" ")}</h2>
                <section className="my-4 gap-y-2 flex flex-col w-full">
                    <Input
                        type="date"
                        title="Data rozpoczęcia dzierżawy"
                        error={errors.startDate}
                        handleChange={(e) => setFieldData((prev) => ({...prev, startDate:e.target.value}))}
                        value={fieldData.startDate}
                    />
                    <Input
                        type="date"
                        title="Data zakończenia dzierżawy"
                        error={errors.endDate}
                        handleChange={(e) => setFieldData((prev) => ({...prev, endDate:e.target.value}))}
                        value={fieldData.endDate}
                    />
                    <section className="flex items-start w-full justify-between gap-x-5 my-5">
                        <TipSelect
                            placeholder="Podaj dzierżawcę"
                            title="Dzierżawca"
                            options={renters.map((obj) => ({key:`${obj.name} ${obj.phone.match(/.{1,3}/g).join(" ")}`, value:obj.id}))}
                            error={errors.idRenter}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idRenter:value}))}
                            value={fieldData.idRenter}
                        />
                        <section className="w-full">
                            <InsertRenter onInsert={(renter) => {
                                    setRenters((prev) => [...prev, renter])
                                    setFieldData((prev) => ({...prev, idRenter:renter.id}))
                                }}/>
                        </section>
                    </section>
                    <Input
                        type="number"
                        placeholder="Podaj stawkę czynszu(zł)"
                        title="Stawka czynszu(zł)"
                        error={errors.rental}
                        handleChange={(e) => setFieldData((prev) => ({...prev, rental:e.target.value}))}
                        value={fieldData.rental}
                    />
                    <section className="w-full flex justify-center items-end gap-x-4">
                        <section className="flex-1">
                            <Select
                                title="Data wystawienia faktury czynszowej"
                                error={errors.issueRentalFactureMonth}
                                options={<>
                                    <option value="1">Styczeń</option>
                                    <option value="2">Luty</option>
                                    <option value="3">Marzec</option>
                                    <option value="4">Kwiecień</option>
                                    <option value="5">Maj</option>
                                    <option value="6">Czerwiec</option>
                                    <option value="7">Lipiec</option>
                                    <option value="8">Sierpień</option>
                                    <option value="9">Wrzesień</option>
                                    <option value="10">Październik</option>
                                    <option value="11">Listopad</option>
                                    <option value="12">Grudzień</option>
                                </>}
                                defaultOption="Nie wybrano"
                                defaultOptionHidden={true}
                                handleChange={(e) => setFieldData((prev) => ({...prev, issueRentalFactureMonth:e.target.value}))}
                                value={fieldData.issueRentalFactureMonth}
                            />
                        </section>
                        <section className="flex-1">
                            <Input
                                min={1}
                                max={31}
                                type="number"
                                placeholder="Dzień miesiąca"
                                handleChange={(e) => setFieldData((prev) => ({...prev, issueRentalFactureDay:e.target.value}))}
                                value={fieldData.issueRentalFactureDay}
                                error={errors.issueRentalFactureDay}
                            />
                        </section>
                    </section>
                </section>
                <button type="button" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Zapisz zmiany</button>
            </Form>
        </section>
    )
}

export default UpdateRent;