import { faBroom, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";


const SearchBarLayout = ({ onClose, children, isValidated = () => {}, onClear}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidated()) {
            const formData = new FormData(e.currentTarget);
            const params = {};
            for (const [key, value] of formData.entries()) {
                if(value != "" && value != null) params[key] = value;
            }
            setSearchParams(params);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center h-full overflow-auto">
            <section className="flex gap-x-2 items-center">
                <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
                <button type="submit" className="error-btn m-3" onClick={onClear}><FontAwesomeIcon icon={faBroom}/> Wyczyść</button>
            </section>
            <h1 className="text-2xl font-bold">Opcje szukania</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                {children}
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faSearch}/> Szukaj</button>
        </form>
    )
}

export default SearchBarLayout;