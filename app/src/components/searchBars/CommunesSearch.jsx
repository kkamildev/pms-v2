import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useLocations from "../../hooks/useLocations";
import { useEffect } from "react";
import useFormFields from "../../hooks/useFormFields";
import SearchBarLayout from "../../layouts/SearchBarLayout";
import Select from "../inputs/Select";
import TipSelect from "../inputs/TipSelect";
import { useState } from "react";

const CommunesSearch = ({onClose = () => {}}) => {
    const {get} = useApi();
    const [searchParams] = useSearchParams();

    const [existLocationsData, setExistLocationsData] = useState({
        towns:[],
        provinces:[],
        districts:[],
        communes:[]
    });

    useEffect(() => {
        getLocationsData();
    }, []);

    const getLocationsData = () => {
        get("/api/locations/unique", (res) => Object.keys(res.data.locationsData).forEach((key) => setExistLocationsData((prev) =>
            ({...prev, [key]:res.data.locationsData[key].map((obj) => obj.name)})
        )))
    }

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"taxDistrict",
            allowNull:true,
            regexp:/^[0-4]$/,
            errorText:"Nie poprawny",
        },
        {
            name:"agriculturalTax",
            allowNull:true,
            regexp:/^(0|1)$/,
            errorText:"Nie poprawny"
        },
        {
            name:"forestTax",
            allowNull:true,
            regexp:/^(0|1)$/,
            errorText:"Nie poprawny"
        },
        {
            name:"commune",
            allowNull:true,
        },
        {
            name:"district",
            allowNull:true,
        },
        {
            name:"province",
            allowNull:true,
        },
        {
            name:"limit",
            allowNull:true,
            regexp:/^[0-9]+$/,
            errorText:"Nie poprawny"
        },
    ])
    
    const [provinces, districts, communes, towns] = useLocations(fieldData.province, fieldData.district, fieldData.commune, "");
    useEffect(() => {
        if(Object.keys(Object.fromEntries(searchParams.entries())).length != 0) {
            setFieldData(Object.fromEntries(searchParams.entries()))
        }
    }, []);

    return (
        <SearchBarLayout onClose={onClose} isValidated={isValidated} onClear={() => setFieldData({})}>
            <Select
                title="Okręg podatkowy"
                error={errors.taxDistrict}
                handleChange={(e) => setFieldData((prev) => ({...prev, taxDistrict:e.target.value}))}
                value={fieldData.taxDistrict}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={<>
                    <option value="1">I</option>
                    <option value="2">II</option>
                    <option value="3">III</option>
                    <option value="4">IV</option>
                </>}
                name="taxDistrict"
            />
            <Select
                title="Przypisana stawka podatku rolnego"
                error={errors.agriculturalTax}
                handleChange={(e) => setFieldData((prev) => ({...prev, agriculturalTax:e.target.value}))}
                value={fieldData.agriculturalTax}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={<>
                    <option value="1">Tak</option>
                    <option value="0">Nie</option>
                </>}
                name="agriculturalTax"
            />
            <Select
                title="Przypisana stawka podatku leśnego"
                error={errors.forestTax}
                handleChange={(e) => setFieldData((prev) => ({...prev, forestTax:e.target.value}))}
                value={fieldData.forestTax}
                defaultOption="Nie wybrano"
                defaultOptionHidden={false}
                options={<>
                    <option value="1">Tak</option>
                    <option value="0">Nie</option>
                </>}
                name="forestTax"
            />
            <TipSelect
                placeholder="Podaj województwo"
                title="Województwo"
                options={provinces.filter((obj) => [...existLocationsData.provinces].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.province}
                handleChange={(value) => setFieldData((prev) => ({...prev, province:value}))}
                value={fieldData.province}
                name="province"
            />
            <TipSelect
                placeholder="Podaj powiat"
                title="Powiat"
                options={districts.filter((obj) => [...existLocationsData.districts].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.district}
                handleChange={(value) => setFieldData((prev) => ({...prev, district:value}))}
                value={fieldData.district}
                name="district"
            />
            <TipSelect
                placeholder="Podaj gminę"
                title="Gmina"
                options={communes.filter((obj) => [...existLocationsData.communes].includes(obj)).map((obj) => ({key:obj, value:obj}))}
                error={errors.commune}
                handleChange={(value) => setFieldData((prev) => ({...prev, commune:value}))}
                value={fieldData.commune}
                name="commune"
            />
        </SearchBarLayout>
    )
}

export default CommunesSearch;