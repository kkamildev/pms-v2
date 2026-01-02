import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFormFields from "../../hooks/useFormFields";
import SearchBarLayout from "../../layouts/SearchBarLayout";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import useApi from "../../hooks/useApi";
import TipInput from "../inputs/TipInput";
import useLocations from "../../hooks/useLocations";


const LandsSearch = ({onClose = () => {}}) => {
    const {get} = useApi();
    const [searchParams] = useSearchParams();
    
    const [landPurposes, setLandPurposes] = useState([]);
    const [groundClasses, setGroundClasses] = useState([]);

    useEffect(() => {
        getLandPurposes();
        getGroundClasses();
    }, []);

    const getLandPurposes = () => {
        get("/api/land-purposes/get-all", (res) => setLandPurposes(res.data.landPurposes))
    }

    const getGroundClasses = () => {
        get("/api/ground-classes/unique", (res) => setGroundClasses(res.data.classes))
    }

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"serialFilter",
            allowNull:true,
        },
        {
            name:"purchaseYearFilter",
            allowNull:true,
            regexp:/^[0-9]+$/,
            errorText:"Nie poprawny"
        },
        {
            name:"lowSellDateFilter",
            allowNull:true,
        },
        {
            name:"highSellDateFilter",
            allowNull:true,
        },
        {
            name:"ownerFilter",
            allowNull:true,
        },
        {
            name:"purposeFilter",
            allowNull:true,
        },
        {
            name:"rentFilter",
            allowNull:true,
            regexp:/^(false|true)$/,
            errorText:"true lub false"
        },
        {
            name:"lowAreaFilter",
            allowNull:true,
            regexp:/^-?\d+(.\d+)?$/,
            errorText:"Nie poprawna"
        },
        {
            name:"highAreaFilter",
            allowNull:true,
            regexp:/^-?\d+(.\d+)?$/,
            errorText:"Nie poprawna"
        },
        {
            name:"communeFilter",
            allowNull:true,
        },
        {
            name:"districtFilter",
            allowNull:true,
        },
        {
            name:"provinceFilter",
            allowNull:true,
        },
        {
            name:"townFilter",
            allowNull:true,
        },
        {
            name:"landNumberFilter",
            allowNull:true,
        },
        {
            name:"groundClassFilter",
            allowNull:true,
        },
        {
            name:"limit",
            allowNull:true,
            regexp:/^[0-9]+$/,
            errorText:"Nie poprawny"
        },
    ]);

    const [provinces, districts, communes, towns] = useLocations(fieldData.provinceFilter, fieldData.districtFilter, fieldData.communeFilter, 
        fieldData.townFilter,
    );
    useEffect(() => {
        if(Object.keys(Object.fromEntries(searchParams.entries())).length != 0) {
            setFieldData(Object.fromEntries(searchParams.entries()))
        }
    }, []);
    return (
        <SearchBarLayout onClose={onClose} isValidated={isValidated} onClear={() => setFieldData({})}>
            <Input
                placeholder="Podaj numer seryjny"
                title="Numer seryjny działki"
                error={errors.serialFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, serialFilter:e.target.value}))}
                value={fieldData.serialFilter}
                name="serialNumberFilter"
            />
            <Input
                placeholder="Podaj numer działki"
                title="Numer działki"
                error={errors.landNumberFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, landNumberFilter:e.target.value}))}
                value={fieldData.landNumberFilter}
                name="landNumberFilter"
            />
            <TipInput
                placeholder="Podaj Miejscowość"
                title="Miejscowość"
                options={towns.map((obj) => obj.name)}
                error={errors.townFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, townFilter:e.target.dataset.value, ...(e.target.value && {townFilter:e.target.value})}))}
                value={fieldData.townFilter}
                name="townFilter"
            />
            <TipInput
                placeholder="Podaj województwo"
                title="Województwo"
                options={provinces}
                error={errors.provinceFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, provinceFilter:e.target.dataset.value,
                        ...(e.target.value && {provinceFilter:e.target.value})}))}
                value={fieldData.provinceFilter}
                name="provinceFilter"
            />
            <TipInput
                placeholder="Podaj powiat"
                title="Powiat"
                error={errors.districtFilter}
                options={districts}
                handleChange={(e) => setFieldData((prev) => ({...prev, districtFilter:e.target.dataset.value,
                        ...(e.target.value && {districtFilter:e.target.value})}))}
                value={fieldData.districtFilter}
                name="districtFilter"
            />
            <TipInput
                placeholder="Podaj gminę"
                title="Gmina"
                error={errors.communeFilter}
                options={communes}
                handleChange={(e) => setFieldData((prev) => ({...prev, communeFilter:e.target.dataset.value,
                     ...(e.target.value && {communeFilter:e.target.value})}))}
                value={fieldData.communeFilter}
                name="communeFilter"
            />
            <Input
                placeholder="Podaj imie/nazwisko właściciela"
                title="Imie/nazwisko"
                error={errors.ownerFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, ownerFilter:e.target.value}))}
                value={fieldData.ownerFilter}
                name="ownerFilter"
            />
            <Select
                title="Aktualnie dzierżawiona"
                error={errors.rentFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, rentFilter:e.target.value}))}
                value={fieldData.rentFilter}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={<>
                    <option value="true">Tak</option>
                    <option value="false">Nie</option>
                </>}
                name="rentFilter"
            />
            <Select
                title="Przeznaczenie działki"
                error={errors.purposeFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, purposeFilter:e.target.value}))}
                value={fieldData.purposeFilter}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={landPurposes.map((obj) => <option key={obj.id} value={obj.type}>{obj.type}</option>)}
                name="purposeFilter"
            />
            <Select
                title="Zawiera klasę gruntu"
                error={errors.groundClassFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, groundClassFilter:e.target.value}))}
                value={fieldData.groundClassFilter}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={groundClasses.map((obj) => <option key={obj.id} value={obj.class}>{obj.class}</option>)}
                name="groundClassFilter"
            />
            <Input
                type="number"
                min="0"
                placeholder="Podaj rok nabycia"
                title="Rok nabycia"
                error={errors.purchaseYearFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, purchaseYearFilter:e.target.value}))}
                value={fieldData.purchaseYearFilter}
                name="purchaseYearFilter"
            />
            <Input
                type="number"
                step="any"
                placeholder="Podaj powierzchnię(ha) od"
                title="Powierzchnia(ha) od"
                error={errors.lowAreaFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, lowAreaFilter:e.target.value}))}
                value={fieldData.lowAreaFilter}
                name="lowAreaFilter"
            />
            <Input
                type="number"
                step="any"
                placeholder="Podaj powierzchnię(ha) do"
                title="Powierzchnia(ha) do"
                error={errors.highAreaFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, highAreaFilter:e.target.value}))}
                value={fieldData.highAreaFilter}
                name="highAreaFilter"
            />
            <Input
                type="date"
                placeholder="Podaj datę sprzedaży od"
                title="data sprzedaży do"
                error={errors.lowSellDateFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, lowSellDateFilter:e.target.value}))}
                value={fieldData.lowSellDateFilter}
                name="lowSellDateFilter"
            />
            <Input
                type="date"
                placeholder="Podaj datę sprzedaży do"
                title="data sprzedaży do"
                error={errors.highSellDateFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, highSellDateFilter:e.target.value}))}
                value={fieldData.highSellDateFilter}
                name="highSellDateFilter"
            />
            <Input
                type="number"
                placeholder="Podaj limit wyników"
                title="Limit wyników"
                error={errors.limit}
                handleChange={(e) => setFieldData((prev) => ({...prev, limit:e.target.value}))}
                value={fieldData.limit}
                name="limit"
            />
        </SearchBarLayout>
    )
}

export default LandsSearch;