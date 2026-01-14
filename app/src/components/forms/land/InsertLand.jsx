import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFormFields from "../../../hooks/useFormFields"
import Input from "../../inputs/Input"
import useApi from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import ErrorBox from "../../popups/ErrorBox"
import TipInput from "../../inputs/TipInput";
import TipSelect from "../../inputs/TipSelect";
import useLocations from "../../../hooks/useLocations";
import InsertOwner from "../owner/InsertOwner";
import Select from "../../inputs/Select";
import TextArea from "../../inputs/TextArea";


const InsertLand = ({onClose = () => {}, reload = () => {}}) => {

    const {post, get} = useApi();

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"landNumber",
            allowNull:false,
            regexp:/^(?=.{1,7}$)(\d+|\d+\/\d+)$/,
            errorText:"Nie poprawny"
        },
        {
            name:"area",
            allowNull:false,
            regexp:/^\d{0,4}.\d{0,4}$/,
            errorText:"Nie poprawna (4 miejsca po przecinku)"
        },
        {
            name:"town",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długa"
        },
        {
            name:"commune",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długa"
        },
        {
            name:"district",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długi"
        },
        {
            name:"province",
            allowNull:false,
            regexp:/^.{1,50}$/,
            errorText:"Za długie"
        },
        {
            name:"idOwner",
            allowNull:false,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"propertyTax",
            allowNull:false,
            regexp:/^(false|true)$/,
            errorText:"Nie poprawne",
            defaultValue:"false"
        },
        {
            name:"serialNumber",
            allowNull:true,
            regexp:/^\d+_\d\.\d{4}\.\d+(?:\/\d+)?$/,
            errorText:"Nie poprawny"
        },
        {
            name:"registerNumber",
            allowNull:true,
            regexp:/^[A-Za-z]{2}\d[A-Za-z]\/\d{8}\/\d$/,
            errorText:"Nie poprawny"
        },
        {
            name:"mortgage",
            allowNull:true,
            regexp:/^(false|true)$/,
            errorText:"Nie poprawna",
            defaultValue:"false"
        },
        {
            name:"idLandType",
            allowNull:true,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"description",
            allowNull:true,
            regexp:/^.{1,65535}$/,
            errorText:"Za długi"
        },
        {
            name:"idLandPurpose",
            allowNull:true,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"idMpzp",
            allowNull:true,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"idGeneralPlan",
            allowNull:true,
            regexp:/^.{21}$/,
            errorText:"Nie poprawny"
        },
        {
            name:"waterCompany",
            allowNull:true,
            regexp:/^(false|true)$/,
            errorText:"Nie poprawna",
            defaultValue:"false"
        },
        {
            name:"purchaseDate",
            allowNull:true,
        },
        {
            name:"purchaseActNumber",
            allowNull:true,
            regexp:/^(?=.{1,21}$)(\d+\/\d+)$/,
            errorText:"Nie poprawny lub za długi"
        },
        {
            name:"seller",
            allowNull:true,
            regexp:/^.{1,50}$/,
            errorText:"Za długi"
        },
        {
            name:"purchasePrice",
            allowNull:true,
            regexp:/^\d{1,8}$/,
            errorText:"Za długi"
        },
        {
            name:"sellDate",
            allowNull:true,
        },
        {
            name:"sellActNumber",
            allowNull:true,
            regexp:/^(?=.{1,21}$)(\d+\/\d+)$/,
            errorText:"Nie poprawny lub za długi"
        },
        {
            name:"buyer",
            allowNull:true,
            regexp:/^.{1,50}$/,
            errorText:"Za długi"
        },
        {
            name:"sellPrice",
            allowNull:true,
            regexp:/^\d{1,8}$/,
            errorText:"Za długi"
        },
    ]);

    const [provinces, districts, communes, towns] = useLocations(fieldData.province, fieldData.district, fieldData.commune, 
        fieldData.town,
    );

    const [insertionData, setInsertionData] = useState({});

    useEffect(() => {
        get("/api/lands/get-insertion-data", (res) => setInsertionData(res.data.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidated()) {
            post("/api/lands/insert", {...fieldData}, (res) => {
                onClose()
                reload()
            });
        }
    }

    const handleTownChange = (value) => {
        let location = "";
        if (value) {
            location = value.split(", ");
        }
        setFieldData((prev) => ({...prev, town:location[0], ...(location[1] && {commune:location[1]}),
             ...(location[2] && {district:location[2]}), ...(location[3] && {province:location[3]})}))
    }


    return (
        <section className="w-full flex justify-center items-start overflow-auto">
            <form onSubmit={handleSubmit} className="min-w-[43%] p-5 flex flex-col items-center justify-center">
                <ErrorBox/>
                <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
                <h1 className="text-2xl font-bold">Dodaj działkę</h1>
                <section className="my-4 gap-y-2 flex flex-col w-full">
                    <section className="flex gap-x-5 items-start w-full">
                        <Input
                            placeholder="Podaj numer seryjny działki"
                            title="Numer seryjny działki (opcjonalny)"
                            error={errors.serialNumber}
                            handleChange={(e) => setFieldData((prev) => ({...prev, serialNumber:e.target.value}))}
                            value={fieldData.serialNumber}
                        />
                        <Input
                            placeholder="Podaj numer działki"
                            title="Numer działki"
                            error={errors.landNumber}
                            handleChange={(e) => setFieldData((prev) => ({...prev, landNumber:e.target.value}))}
                            value={fieldData.landNumber}
                        />
                    </section>
                    <Input
                        type="number"
                        step="any"
                        min="0"
                        max="10000"
                        placeholder="Podaj powierzchnie(ha) działki"
                        title="Powierzchnia(ha) działki"
                        error={errors.area}
                        handleChange={(e) => setFieldData((prev) => ({...prev, area:e.target.value}))}
                        value={fieldData.area}
                    />
                    <TipInput
                        placeholder="Podaj miejscowość"
                        title="Miejscowość"
                        options={towns.map((obj) => `${obj.name}, ${obj.location.commune}, ${obj.location.district}, ${obj.location.province}`)}
                        error={errors.town}
                        handleChange={handleTownChange}
                        value={fieldData.town}
                    />
                    <section className="flex gap-x-5 items-start w-full">
                        <TipInput
                            placeholder="Podaj województwo"
                            title="Województwo"
                            options={provinces}
                            error={errors.province}
                            handleChange={(value) => setFieldData((prev) => ({...prev, province:value}))}
                            value={fieldData.province}
                        />
                        <TipInput
                            placeholder="Podaj powiat"
                            title="Powiat"
                            options={districts}
                            error={errors.district}
                            handleChange={(value) => setFieldData((prev) => ({...prev, district:value}))}
                            value={fieldData.district}
                        />
                        <TipInput
                            placeholder="Podaj gmine"
                            title="Gmina"
                            options={communes}
                            error={errors.commune}
                            handleChange={(value) => setFieldData((prev) => ({...prev, commune:value}))}
                            value={fieldData.commune}
                        />
                    </section>
                    <section className="flex items-start w-full justify-between gap-x-5 my-5">
                        <TipSelect
                            placeholder="Podaj właściciela"
                            title="Właściciel"
                            options={insertionData.owners ? insertionData.owners.map((obj) => ({key:`${obj.name} ${obj.phone ? obj.phone.match(/.{1,3}/g).join(" ") : "Brak telefonu"}`, value:obj.id})) : []}
                            error={errors.idOwner}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idOwner:value}))}
                            value={fieldData.idOwner}
                        />
                        <section className="w-full">
                            <InsertOwner onInsert={(owner) => {
                                    setInsertionData((prev) => ({...prev, owners:[...prev.owners, owner]}))
                                    setFieldData((prev) => ({...prev, idOwner:owner.id}))
                                }}/>
                        </section>
                    </section>
                        <TextArea
                            placeholder="Podaj opis działki"
                            title="Podaj opis działki (opcjonalnie)"
                            error={errors.description}
                            handleChange={(e) => setFieldData((prev) => ({...prev, description:e.target.value}))}
                            value={fieldData.description}
                        />
                    <section className="flex items-start w-full mt-5 gap-x-5">
                        <TipSelect
                            placeholder="Podaj przeznaczenie"
                            title="Przeznaczenie (opcjonalnie)"
                            options={insertionData.landPurposes ? insertionData.landPurposes.map((obj) => ({key:obj.type, value:obj.id})) : []}
                            error={errors.idlandPurpose}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idLandPurpose:value}))}
                            value={fieldData.idLandPurpose}
                        />
                        <TipSelect
                            placeholder="Podaj rodzaj"
                            title="Rodzaj (opcjonalnie)"
                            options={insertionData.landTypes ? insertionData.landTypes.map((obj) => ({key:obj.type, value:obj.id})) : []}
                            error={errors.idlandType}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idLandType:value}))}
                            value={fieldData.idLandType}
                        />
                    </section>
                    <section className="flex items-start w-full mb-5 gap-x-5">
                        <TipSelect
                            count={100}
                            placeholder="Podaj MPZP"
                            title="MPZP (opcjonalnie)"
                            options={insertionData.mpzp ? insertionData.mpzp.map((obj) => ({key:`${obj.code} ${obj.description}`, value:obj.id})) : []}
                            error={errors.idMpzp}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idMpzp:value}))}
                            value={fieldData.idMpzp}
                        />
                        <TipSelect
                            count={100}
                            placeholder="Podaj plan ogólny"
                            title="Plan ogólny (opcjonalnie)"
                            options={insertionData.generalPlans ? insertionData.generalPlans.map((obj) => ({key:`${obj.code} ${obj.description}`, value:obj.id})) : []}
                            error={errors.idGeneralPlan}
                            handleChange={(value) => setFieldData((prev) => ({...prev, idGeneralPlan:value}))}
                            value={fieldData.idGeneralPlan}
                        />
                    </section>
                    <section className="flex gap-x-5 items-start w-full">
                        <Input
                            placeholder="Podaj nr. księgi wieczystej"
                            title="Nr. księgi wieczystej (opcjonalnie)"
                            error={errors.registerNumber}
                            handleChange={(e) => setFieldData((prev) => ({...prev, registerNumber:e.target.value}))}
                            value={fieldData.registerNumber}
                        />
                        <Select
                            title="Podatek od nieruchomości"
                            options={<>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </>}
                            error={errors.propertyTax}
                            handleChange={(e) => setFieldData((prev) => ({...prev, propertyTax:e.target.value}))}
                            value={fieldData.propertyTax}
                        />
                    </section>
                    <section className="flex items-start w-full gap-x-5">
                        <Select
                            title="Hipoteka"
                            options={<>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </>}
                            error={errors.mortgage}
                            handleChange={(e) => setFieldData((prev) => ({...prev, mortgage:e.target.value}))}
                            value={fieldData.mortgage}
                        />
                        <Select
                            title="Spółka wodna"
                            options={<>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </>}
                            error={errors.waterCompany}
                            handleChange={(e) => setFieldData((prev) => ({...prev, waterCompany:e.target.value}))}
                            value={fieldData.waterCompany}
                        />
                    </section>
                    <h1 className="text-center m-3 text-2xl font-bold">Dane nabycia</h1>
                    <section className="flex items-start w-full gap-x-5">
                        <Input
                            type="date"
                            placeholder="Podaj datę nabycia"
                            title="Data nabycia (opcjonalnie)"
                            error={errors.purchaseDate}
                            handleChange={(e) => setFieldData((prev) => ({...prev, purchaseDate:e.target.value}))}
                            value={fieldData.purchaseDate}
                        />
                        <Input
                            placeholder="Podaj nr aktu nabycia"
                            title="Nr aktu nabycia (opcjonalnie)"
                            error={errors.purchaseActNumber}
                            handleChange={(e) => setFieldData((prev) => ({...prev, purchaseActNumber:e.target.value}))}
                            value={fieldData.purchaseActNumber}
                        /> 
                    </section>
                    <section className="flex items-start w-full gap-x-5">
                        <Input
                            placeholder="Podaj od kogo nabyte"
                            title="Od kogo nabyte (opcjonalnie)"
                            error={errors.seller}
                            handleChange={(e) => setFieldData((prev) => ({...prev, seller:e.target.value}))}
                            value={fieldData.seller}
                        />
                        <Input
                            placeholder="Podaj cenę(zł) nabycia"
                            title="Cena(zł) nabycia (opcjonalnie)"
                            error={errors.purchasePrice}
                            handleChange={(e) => setFieldData((prev) => ({...prev, purchasePrice:e.target.value}))}
                            value={fieldData.purchasePrice}
                        /> 
                    </section>
                    <h1 className="text-center m-3 text-2xl font-bold">Dane sprzedaży</h1>
                    <section className="flex items-start w-full gap-x-5">
                        <Input
                            type="date"
                            placeholder="Podaj datę sprzedaży"
                            title="Data sprzedaży (opcjonalnie)"
                            error={errors.sellDate}
                            handleChange={(e) => setFieldData((prev) => ({...prev, sellDate:e.target.value}))}
                            value={fieldData.sellDate}
                        />
                        <Input
                            placeholder="Podaj nr aktu sprzedaży"
                            title="Nr aktu sprzedaży (opcjonalnie)"
                            error={errors.sellActNumber}
                            handleChange={(e) => setFieldData((prev) => ({...prev, sellActNumber:e.target.value}))}
                            value={fieldData.sellActNumber}
                        /> 
                    </section>
                    <section className="flex items-start w-full gap-x-5">
                        <Input
                            placeholder="Podaj komu sprzedane"
                            title="Komu sprzedane (opcjonalnie)"
                            error={errors.buyer}
                            handleChange={(e) => setFieldData((prev) => ({...prev, buyer:e.target.value}))}
                            value={fieldData.buyer}
                        />
                        <Input
                            placeholder="Podaj wartość(zł) sprzedaży"
                            title="Wartość(zł) sprzedaży (opcjonalnie)"
                            error={errors.sellPrice}
                            handleChange={(e) => setFieldData((prev) => ({...prev, sellPrice:e.target.value}))}
                            value={fieldData.sellPrice}
                        /> 
                    </section>
                </section>
                <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPen}/> Dodaj</button>
            </form>
        </section>
    )
}

export default InsertLand;