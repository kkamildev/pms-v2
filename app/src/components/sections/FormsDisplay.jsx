
import RoleRequired from "../nav/RoleRequired"
import Title from "../nav/Title";
import PrintButton from "../inputs/PrintButton"
import LandForm from "../toPrint/LandForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const FormsDisplay = () => {
    return (
        <RoleRequired roles={["TEREN"]}>
            <section className="flex justify-between h-full">
                <Title title={"PMS-v2 - formularze"}/>
                <section className="flex flex-col w-full p-5 overflow-y-auto">
                    <section className="flex items-center gap-x-5">
                        <h1 className="text-4xl font-bold">Formularze</h1>
                    </section>
                    <section className="my-5">
                        <PrintButton printComponent={<LandForm/>} documentTitle="System SK INVEST/formularz">
                            <span className="text-xl"><FontAwesomeIcon icon={faFile}/> Formularz działki</span>
                        </PrintButton>
                    </section>
                </section>
            </section>
        </RoleRequired>
    )
}

export default FormsDisplay;