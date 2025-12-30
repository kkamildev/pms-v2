import { faCity, faFile, faHouse, faLocationDot, faMountainSun, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbutton from "./Navbutton"

const Navbar = () => {

    return (
        <nav className="flex flex-col border-r-4 border-r-green-700 h-full w-50">
            <section className="p-4">
                <h1 className="text-center font-bold text-3xl text-green-600">Panel Systemowy</h1>
            </section>
            <section className="border-t-4 border-t-green-700 w-full flex flex-col">
                <Navbutton path="/">
                    <FontAwesomeIcon icon={faHouse}/> Działki
                </Navbutton>
                <Navbutton path="/owners">
                    <FontAwesomeIcon icon={faUsers}/> Właściciele działek
                </Navbutton>
                <Navbutton path="/rents">
                    <FontAwesomeIcon icon={faUsers}/> Dzierżawy i dzierżawcy
                </Navbutton>

                <Navbutton roles={["TEREN"]} path="/forms">
                    <FontAwesomeIcon icon={faFile}/> Formularze
                </Navbutton>
                <Navbutton roles={["KSIEGOWOSC", "SEKRETARIAT"]} path="/ground-classes">
                    <FontAwesomeIcon icon={faMountainSun}/> Klasy gruntów
                </Navbutton>
                <Navbutton roles={["KSIEGOWOSC", "SEKRETARIAT"]} path="/communes">
                    <FontAwesomeIcon icon={faLocationDot}/> Gminy i stawki podatkowe
                </Navbutton>

                <Navbutton roles={["ADMIN"]} path="/users">
                    <FontAwesomeIcon icon={faUserTie}/> Użytkownicy
                </Navbutton>
                <Navbutton roles={["ADMIN"]} path="/mpzp">
                    <FontAwesomeIcon icon={faCity}/> Mpzp
                </Navbutton>
                <Navbutton roles={["ADMIN"]} path="/general-plans">
                    <FontAwesomeIcon icon={faFile}/> Plany ogólne
                </Navbutton>
                <Navbutton roles={["ADMIN"]} path="/land-types">
                    <FontAwesomeIcon icon={faHouse}/> Rodzaje działek
                </Navbutton>
                <Navbutton roles={["ADMIN"]} path="/land-purposes">
                    <FontAwesomeIcon icon={faHouse}/> Przeznaczenia działek
                </Navbutton>
            </section>
        </nav>
    )
}

export default Navbar;