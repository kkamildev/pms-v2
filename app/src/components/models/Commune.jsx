import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateDataStore } from "../../hooks/stores";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Commune = ({data, number, onUpdate}) => {

    const updateUpdateData = useUpdateDataStore((state) => state.update);

    return (
        <section className="flex flex-col gap-y-5 border-3 m-1 p-5">
            <section className="flex justify-between items-center">
                <section className="flex justify-start">
                    { number && <h1 className="mr-4 font-bold text-2xl">{number}#</h1>}
                    <h2 className="text-2xl font-bold">Gmina: {data.commune}</h2>
                    <h2 className="text-2xl ml-3">{data.district}, {data.province}</h2>
                    <p className="text-2xl ml-6">Okręg podatkowy: <strong>{data.taxDistrict ? ["I", "II", "III", "IV"][data.taxDistrict - 1] : "Brak"}</strong></p>
                </section>
                <section className="flex justify-around items-center gap-x-3">
                    <button className="edit-btn" onClick={() => {
                            updateUpdateData({...data, number})
                            onUpdate()
                        }}>
                        <FontAwesomeIcon icon={faPen}/> Edytuj
                    </button>
                </section>
            </section>
            <section className="flex gap-x-5">
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Stawka podatku rolnego</span>
                    <p>{data.agriculturalTax ? data.agriculturalTax + " zł/ha przel." : "Brak"}</p>
                </div>
                <div className="flex-col text-center flex items-center text-xl">
                    <span className="font-bold">Stawka podatku leśnego</span>
                    <p>{data.forestTax ? data.forestTax + " zł/ha" : "Brak"}</p>
                </div>
            </section>
        </section>
    )
}

export default Commune;