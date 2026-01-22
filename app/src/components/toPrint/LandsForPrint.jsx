import { Fragment } from "react";



const LandsForPrint = ({lands}) => {

    const today = new Date();

    return (
        <section className="max-h-[95%] p-3">
            <h1 className="text-3xl text-center font-bold mt-5">Wypis działek</h1>
            <p className="text-center mt-2">z dnia {today.toLocaleDateString("pl-PL")}</p>
            <h1 className="text-center font-bold mt-5">Liczba działek: {lands.length}</h1>
            <main className="my-5 w-full">
                <footer className="flex w-full text-center h-full mb-5 font-bold">
                    <p className="print-table-section print-table-header flex-1"><span>Numer działki</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>Lokalizacja działki</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>Specyfikacja</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>Klasy gruntów</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>Pow. działki</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>Właściciel</span></p>
                    <p className="print-table-section print-table-header flex-2"><span>NR KW/spół. wodna/hipoteka</span></p>
                </footer>
                <section>
                    {
                        lands.map((obj) => 
                        <section className="flex-col items-start break-inside-avoid gap-y-2" key={obj.id}>
                            <section className="">
                                <p className="whitespace-nowrap text-sm mb-1 py-3">ID: <span className="font-bold">{obj.serialNumber || "BRAK"}</span></p>
                            </section>
                            <section className="flex w-full h-full mt-2 break-inside-avoid">
                                <p className="print-table-section flex-1"><span>{obj.landNumber}</span></p>
                                <p className="print-table-section flex-2">
                                    <span>m:{obj.town.name}</span>
                                    <span className="break-all">gm:{obj.town.location.commune}</span>
                                    <span className="break-all">pow:{obj.town.location.district}</span>
                                    <span>woj:{obj.town.location.province}</span>
                                </p>
                                <p className="print-table-section flex-2">
                                    <span>MPZP: {obj.mpzp ? obj.mpzp.code : "brak"}</span>
                                    <span>Plan ogól.: {obj.generalPlan ? obj.generalPlan.code : "brak"}</span>
                                    <span>Przeznaczenie: {obj.landPurpose ? obj.landPurpose.type : "brak"}</span>
                                    <span>Rodzaj: {obj.landType ? obj.landType.type : "brak"}</span>
                                </p>
                                <p className="print-table-section flex-2">
                                    {
                                        obj.areas.map((obj, index) =>
                                            <span key={`${index}k`}>{obj.groundClass.class} {obj.area}ha</span>
                                            )
                                    }
                                </p>
                                <p className="print-table-section flex-2"><span>{obj.area}ha</span></p>
                                <p className="print-table-section flex-2">
                                    <span className="break-all">{obj.owner.name}</span>
                                    <span>tel:{obj.owner.phone || "BRAK"}</span>
                                </p>
                                <p className="print-table-section flex-2">
                                    <span>{obj.registerNumber}</span>
                                    <span>spół. wodna {obj.waterCompany ? "TAK" : "NIE"}</span>
                                    <span>hipoteka {obj.mortgage ? "TAK" : "NIE"}</span>
                                </p>
                            </section>
                            <section className="border-b-2 border-dashed mt-2">
                            </section>
                        </section>
                        )
                    }
                </section>
            </main>
        </section>
    )

    // return (
    //     <section className="max-h-[95%] p-3">
    //        
    //                 {
    //                     lands.map((obj) =>
    //                     <Fragment key={obj.id}>
    //                         <tr className="border-t-black border-t-2 break-inside-avoid">
    //                             <td className="print-table-section">{obj.landNumber}</td>
    //                             <td className="print-table-section">
    //                                 <p className="">m:{obj.town.name}</p>
    //                                 <p className="break-all">gm:{obj.town.location.commune}</p>
    //                                 <p className="break-all">pow:{obj.town.location.district}</p>
    //                                 <p className="">woj:{obj.town.location.province}</p>
    //                             </td>
    //                             <td className="print-table-section">
    //                                 <p>MPZP: {obj.mpzp ? obj.mpzp.code : "brak"}</p>
    //                                 <p>plan ogól.: {obj.generalPlan ? obj.generalPlan.code : "brak"}</p>
    //                                 <p>Przeznaczenie: {obj.landPurpose ? obj.landPurpose.type : "brak"}</p>
    //                                 <p>Rodzaj: {obj.landType ? obj.landType.type : "brak"}</p>
    //                             </td>
    //                             <td className="print-table-section">
    //                                 {
    //                                     obj.areas.map((obj, index) =>
    //                                         <p key={`${index}k`}>{obj.groundClass.class} {obj.area}ha</p>
    //                                         )
    //                                 }
    //                            </td>
    //                             <td className="print-table-section">
    //                                 {obj.area}ha
    //                             </td>
    //                             <td className="print-table-section w-[16%]">
    //                                 <p className="break-all">{obj.owner.name}</p>
    //                                 <p>tel:{obj.owner.phone || "BRAK"}</p>
    //                             </td>
    //                             <td className="print-table-section">
    //                                 <p>{obj.registerNumber}</p>
    //                                 <p>spół. wodna {obj.waterCompany ? "TAK" : "NIE"}</p>
    //                                 <p>hipoteka {obj.mortgage ? "TAK" : "NIE"}</p>
    //                             </td>
    //                         </tr>
    //                         <tr className="border-solid mt-3 break-inside-avoid">
    //                             <td className="whitespace-nowrap text-sm my-2 py-3" colSpan={7}>ID: <span className="font-bold">{obj.serialNumber || "BRAK"}</span></td>
    //                         </tr>
    //                         <tr className="border-solid mt-3 break-inside-avoid">
    //                             <hr className="w-full my-3"/>
    //                         </tr>
    //                     </Fragment>)
    //                 }
    //              </tbody>
    //         </table>
    //         <h1 className="text-xl text-start font-bold mt-5">Podsumowanie</h1>
    //         <hr className="w-full bg-zinc-800 h-1"/>
    //         <section className="flex flex-col gap-y-4 justify-center items-start mt-2">
    //             <section className="flex gap-x-1">
    //                 <p>Powierzchnia ogólna:</p>
    //                 <p>{(lands.reduce((acc, value) => acc + Number(value.area), 0)).toFixed(4)}ha</p>
    //             </section>
    //          </section>
    //     </section>
    // )
}

export default LandsForPrint;
