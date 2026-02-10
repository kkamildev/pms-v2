import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFormFields from "../../hooks/useFormFields";
import SearchBarLayout from "../../layouts/SearchBarLayout";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import useApi from "../../hooks/useApi";
import TipInput from "../inputs/TipInput";
import useLocations from "../../hooks/useLocations";
import TipSelect from "../inputs/TipSelect";


const LandsSearch = ({onClose = () => {}}) => {
    const {get} = useApi();
    const [searchParams] = useSearchParams();
    
    const [landPurposes, setLandPurposes] = useState([]);
    const [groundClasses, setGroundClasses] = useState([]);
    const [existLocationsData, setExistLocationsData] = useState({
        towns:[],
        provinces:[],
        districts:[],
        communes:[]
    });

    useEffect(() => {
        getLandPurposes();
        getGroundClasses();
        getLocationsData();
    }, []);

    const getLandPurposes = () => {
        get("/api/land-purposes/get-all", (res) => setLandPurposes(res.data.landPurposes))
    }

    const getGroundClasses = () => {
        get("/api/ground-classes/unique", (res) => setGroundClasses(res.data.classes))
    }

    const getLocationsData = () => {
        get("/api/locations/unique", (res) => Object.keys(res.data.locationsData).forEach((key) => setExistLocationsData((prev) =>
            ({...prev, [key]:res.data.locationsData[key].map((obj) => obj.name)})
        )))
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

    const handleTownChange = (value) => {
        let location = "";
        if (value) {
            location = value.split(", ");
        }
        setFieldData((prev) => ({...prev, townFilter:location[0], ...(location[1] && {communeFilter:location[1]}),
             ...(location[2] && {districtFilter:location[2]}), ...(location[3] && {provinceFilter:location[3]})}))
    }

    return (
        <SearchBarLayout onClose={onClose} isValidated={isValidated} onClear={() => setFieldData({})}>
            <Input
                placeholder="Podaj ID działki"
                title="Numer ID działki"
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
                options={towns.filter((obj) => [...existLocationsData.towns].includes(obj.name)).map((obj) => `${obj.name}, ${obj.location.commune}, ${obj.location.district}, ${obj.location.province}`)}
                error={errors.townFilter}
                handleChange={handleTownChange}
                value={fieldData.townFilter}
                name="townFilter"
            />
            <TipSelect
                placeholder="Podaj województwo"
                title="Województwo"
                options={provinces.filter((obj) => [...existLocationsData.provinces].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.provinceFilter}
                handleChange={(value) => setFieldData((prev) => ({...prev, provinceFilter:value}))}
                value={fieldData.provinceFilter}
                name="provinceFilter"
            />
            <TipSelect
                placeholder="Podaj powiat"
                title="Powiat"
                options={districts.filter((obj) => [...existLocationsData.districts].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.districtFilter}
                handleChange={(value) => setFieldData((prev) => ({...prev, districtFilter:value}))}
                value={fieldData.districtFilter}
                name="districtFilter"
            />
            <TipSelect
                placeholder="Podaj gminę"
                title="Gmina"
                options={communes.filter((obj) => [...existLocationsData.communes].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.communeFilter}
                handleChange={(value) => setFieldData((prev) => ({...prev, communeFilter:value}))}
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
                placeholder="Podaj datę sprzedaży po dniu"
                title="data sprzedaży po dniu"
                error={errors.highSellDateFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, highSellDateFilter:e.target.value}))}
                value={fieldData.highSellDateFilter}
                name="highSellDateFilter"
            />
            <Input
                type="date"
                placeholder="Podaj datę sprzedaży do dnia"
                title="data sprzedaży do dnia"
                error={errors.lowSellDateFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, lowSellDateFilter:e.target.value}))}
                value={fieldData.lowSellDateFilter}
                name="lowSellDateFilter"
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