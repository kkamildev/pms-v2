import { useMemo } from "react";
import calculateAreaData from "../../functions/calculateAreaData"

const Area = ({data, number, taxDistrict, forestTax, agriculturalTax}) => {

    const colorsMap = {
        "lesny":"border-green-700",
        "rolny":"border-yellow-500",
        "brak":"border-red-500"
    }

    const taxData = useMemo(() => {
        return calculateAreaData(data, taxDistrict, agriculturalTax, forestTax)
    }, [data, taxDistrict, agriculturalTax, forestTax]);

    return (
        <section className={`flex p-5 border-5 gap-x-5 items-center w-full ${colorsMap[data.groundClass.tax]}`}>
            <h1 className="font-bold text-2xl">#{number}</h1>
            <p className="text-2xl font-bold">{data.groundClass.class}</p>
            <p className="text-2xl font-bold">{data.area}ha</p>
            <p className="text-2xl font-bold">{data.groundClass.released && "Podatek zwolniony"}</p>
            {
                data.groundClass.tax == "rolny" &&<>
                    <p className="text-2xl font-bold">Rolny</p>
                    <p className="text-2xl font-bold">Przelicznik:
                        {
                            taxData.converter || <span className="text-red-800">Nie można stwierdzić</span>
                        }
                    </p>
                    {
                        taxDistrict && <>
                            <p className="text-2xl font-bold">ha. przel:{taxData.calculateArea.toFixed(4)}</p>
                            
                            {
                                agriculturalTax ? <p className="text-2xl font-bold">Podatek:{(taxData.tax || 0).toFixed(4)}zł</p>
                                :
                                <p className="text-2xl font-bold text-red-800">Brak stawk. podatku roln.</p>
                            }
                        </>
                    }
                </>
            }
            {
                data.groundClass.tax == "lesny" &&<>
                    <p className="text-2xl font-bold">Leśny</p>
                    {
                        forestTax ? <p className="text-2xl font-bold">Podatek:{(taxData.tax || 0).toFixed(4)}zł</p>
                        :
                        <p className="text-2xl font-bold text-red-800">Brak stawk. podatku leśn.</p>
                    }
                </>
            }
        </section>
    )
}

export default Area;