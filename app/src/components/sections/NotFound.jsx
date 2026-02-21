import { Link } from "react-router-dom";
import Title from "../nav/Title";

const NotFound = () => {
    return (
         <section className="flex justify-between h-full">
            <Title title={"PMS-v2 - Nie znaleziono podstrony"}/>
            <section className="flex flex-col w-full p-5 overflow-y-auto items-center justify-center">
                <h1 className="text-4xl font-bold">Nie znaleziono podstrony</h1>
                <Link to="/" className="my-5">
                    <button className="primary-btn text-2xl">Powrót</button>
                </Link>
            </section>
        </section>
    )
}

export default NotFound;