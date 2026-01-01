import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchBarLayout = ({onSubmit, onClose, children}) => {
    return (
        <form onSubmit={onSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center scroll-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Opcje szukania</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                {children}
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faSearch}/> Szukaj</button>
        </form>
    )
}

export default SearchBarLayout;