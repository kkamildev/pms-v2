
import { useMemo } from "react";
import SummarizeLayout from "../../layouts/SummarizeLayout"
import calculateAreaData from "../../functions/calculateAreaData";

const LandsSummarize = ({onClose = () => {}, lands = []}) => {

    const areas = useMemo(() => {
        return lands.reduce((acc, value) => [...acc, ...value.areas], []);
    }, [lands]);

    const calculateCalculateArea = (area, land) => {
        const location = land.town.location;
        if(!location.taxDistrict) return 0;
        const {calculateArea} = calculateAreaData(area, land.town.location.taxDistrict, 0, 0)
        return Number(calculateArea);
    }

    const calculateAgriculturalTax = (area, land) => {
        const location = land.town.location;
        if(!location.taxDistrict || !location.agriculturalTax) return 0;
        const {tax} = calculateAreaData(area, land.town.location.taxDistrict, location.agriculturalTax, 0)
        return Number(tax);
    }

    const calculateForestTax = (area, land) => {
        const location = land.town.location;
        if(!location.forestTax) return 0;
        const {tax} = calculateAreaData(area, null, 0, location.forestTax)
        return Number(tax);
    }

    return (
        <SummarizeLayout onClose={onClose}>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">Łączna suma powierzchni:</h1>
                <p className="text-xl">{lands.reduce((acc, value) => acc + Number(value.area), 0).toFixed(4)}ha</p>
            </section>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">W tym powierzchnie leśne:</h1>
                <p className="text-xl">{(areas.filter((obj) => obj.groundClass.tax == "lesny").reduce((acc, value) => acc + Number(value.area), 0)).toFixed(4)}ha</p>
            </section>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">W tym powierzchnie rolne:</h1>
                <p className="text-xl">{(areas.filter((obj) => obj.groundClass.tax == "rolny").reduce((acc, value) => acc + Number(value.area), 0)).toFixed(4)}ha</p>
            </section>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">Suma ha. przeliczeniowe (z rolnych)</h1>
                <p className="text-xl">{lands.reduce((acc, value) => acc + value.areas.reduce((acc2, value2) => acc2 + calculateCalculateArea(value2, value), 0), 0).toFixed(4)}</p>
            </section>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">Suma podatku rolnego</h1>
                <p className="text-xl">{lands.reduce((acc, value) => acc + value.areas.reduce((acc2, value2) => acc2 + calculateAgriculturalTax(value2, value), 0), 0).toFixed(4)}zł</p>
            </section>
            <section className="flex flex-col items-start">
                <h1 className="font-bold text-xl">Suma podatku leśnego</h1>
                <p className="text-xl">{lands.reduce((acc, value) => acc + value.areas.reduce((acc2, value2) => acc2 + calculateForestTax(value2, value), 0), 0).toFixed(4)}zł</p>
            </section>
        </SummarizeLayout>
    )
}

export default LandsSummarize;