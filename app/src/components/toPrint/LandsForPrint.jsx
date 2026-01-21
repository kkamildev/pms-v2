import { Fragment } from "react";



const LandsForPrint = ({lands}) => {

    const today = new Date();

    return (
        <section className="max-h-[95%] p-3">
            <h1 className="text-3xl text-center font-bold mt-5">Wypis działek</h1>
            <p className="text-center mt-2">z dnia {today.toLocaleDateString("pl-PL")}</p>
            <h1 className="text-center font-bold mt-5">Liczba działek: {lands.length}</h1>
            <table className="my-5 w-full">
                <thead>
                    <tr>
                        <th className="print-table-section">Numer<br></br>działki</th>
                        <th className="print-table-section">Lokalizacja działki</th>
                        <th className="print-table-section">Specyfikacja</th>
                        <th className="print-table-section">Klasy gruntów</th>
                        <th className="print-table-section">Pow. działki</th>
                        <th className="print-table-section">Właściciel</th>
                        <th className="print-table-section">NR KW/spół. wodna/hipoteka</th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                        lands.map((obj) =>
                        <Fragment key={obj.id}>
                            <tr className=" border-solid mt-3">
                                <td className="whitespace-nowrap text-sm my-2 py-3" colSpan={7}>ID: <span className="font-bold">{obj.serialNumber || "BRAK"}</span></td>
                            </tr>
                            <tr className="border-t-black border-t-2 break-inside-avoid">
                                <td className="print-table-section">{obj.landNumber}</td>
                                <td className="print-table-section">
                                    <p className="">m:{obj.town.name}</p>
                                    <p className="break-all">gm:{obj.town.location.commune}</p>
                                    <p className="break-all">pow:{obj.town.location.district}</p>
                                    <p className="">woj:{obj.town.location.province}</p>
                                </td>
                                <td className="print-table-section">
                                    <p>MPZP: {obj.mpzp ? obj.mpzp.code : "brak"}</p>
                                    <p>plan ogól.: {obj.generalPlan ? obj.generalPlan.code : "brak"}</p>
                                    <p>Przeznaczenie: {obj.landPurpose ? obj.landPurpose.type : "brak"}</p>
                                    <p>Rodzaj: {obj.landType ? obj.landType.type : "brak"}</p>
                                </td>
                                <td className="print-table-section">
                                    {
                                        obj.areas.map((obj, index) =>
                                            <p key={`${index}k`}>{obj.groundClass.class} {obj.area}ha</p>
                                            )
                                    }
                               </td>
                                <td className="print-table-section">
                                    {obj.area}ha
                                </td>
                                <td className="print-table-section w-[16%]">
                                    <p className="break-all">{obj.owner.name}</p>
                                    <p>tel:{obj.owner.phone || "BRAK"}</p>
                                </td>
                                <td className="print-table-section">
                                    <p>{obj.registerNumber}</p>
                                    <p>spół. wodna {obj.waterCompany ? "TAK" : "NIE"}</p>
                                    <p>hipoteka {obj.mortgage ? "TAK" : "NIE"}</p>
                                </td>
                            </tr>
                            <tr className=" border-solid mt-3">
                                <td className="whitespace-nowrap text-sm my-2 py-3 border-b-2 border-dashed border-black w-full" colSpan={7}></td>
                            </tr>
                        </Fragment>)
                    }
                 </tbody>
            </table>
            <h1 className="text-xl text-start font-bold mt-5">Podsumowanie</h1>
            <hr className="w-full bg-zinc-800 h-1"/>
            <section className="flex flex-col gap-y-4 justify-center items-start mt-2">
                <section className="flex gap-x-1">
                    <p>Powierzchnia ogólna:</p>
                    <p>{(lands.reduce((acc, value) => acc + Number(value.area), 0)).toFixed(4)}ha</p>
                </section>
             </section>
        </section>
    )
}

export default LandsForPrint;


// export default function LandsForPrint({lands}) {
//     const today = new Date();
//     return (
//         
//                 <tbody>
//                     {
//                         lands.map((obj) =>
//                         <Fragment key={obj.ID}>
//                             <tr className="border-t-black border-t-2 break-inside-avoid">
//                                 <td className="print-table-section">{obj.nr_dzialki}</td>
//                                 <td className="print-table-section">
//                                     <p className="">m:{obj.miejscowosc}</p>
//                                     <p className="break-all">gm:{obj.gmina}</p>
//                                     <p className="break-all">pow:{obj.powiat}</p>
//                                     <p className="">woj:{obj.wojewodztwo}</p>
//                                 </td>
//                                 <td className="print-table-section">
//                                     <p>MPZP: {obj.mpzp || "brak"}</p>
//                                     <p>plan ogól.: {obj.plan_ogolny || "brak"}</p>
//                                     <p>Przeznaczenie: {obj.przeznaczenie || "brak"}</p>
//                                     <p>Rodzaj: {obj.rodzaj || "brak"}</p>
//                                 </td>
//                                 <td className="print-table-section">
//                                     {
//                                         obj.powierzchnie.map((ele, index) =>
//                                             <p key={`${index}k`}>{ele.klasa} {ele.p_powierzchnia}ha</p>
//                                         )
//                                     }
//                                 </td>
//                                 <td className="print-table-section">
//                                     {obj.powierzchnia}ha
//                                 </td>
//                                 <td className="print-table-section">
//                                     <p className="break-all">{obj.w_dane_osobowe}</p>
//                                     <p>tel:{obj.w_telefon || "BRAK"}</p>
//                                 </td>
//                                 <td className="print-table-section">
//                                     <p>{obj.nr_kw}</p>
//                                     <p>spół. wodna {obj.spolka_wodna ? "TAK" : "NIE"}</p>
//                                     <p>hipoteka {obj.hipoteka ? "TAK" : "NIE"}</p>
//                                 </td>

//                             </tr>
//                             <tr className="border-t-black border-t-2 border-dashed">
//                                 <td className="whitespace-nowrap text-sm my-2 py-3">ID: <span className="font-bold">{obj.numer_seryjny_dzialki || "BRAK"}</span></td>
//                             </tr>
//                         </Fragment>
//                         )
//                     }
//                 </tbody>
//             </table>
//             <h1 className="text-xl text-start font-bold mt-5">Razem</h1>
//             <hr className="w-[100%] my-1"/>
//             <section className="flex flex-col gap-y-4 justify-center items-start">
//                 <section className="flex gap-x-1">
//                     <p>Powierzchnia fizyczna:</p>
//                     <p>{lands.reduce((acc, value) => acc + Number(value.powierzchnia), 0)}ha</p>
//                 </section>
//             </section>
//         </section>
//     )
// }