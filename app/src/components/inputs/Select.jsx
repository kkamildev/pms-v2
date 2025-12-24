import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Select = ({options, defaultOption = "", defaultOptionHidden = true, title = <></>, handleChange, error = "", value}) => {
    return (
        <section className="w-full">
            <p className="font-bold mb-1 text-lg">{title}</p>
            <select className="p-2 border-2 border-black rounded-md inline-block w-full"
             onChange={handleChange} value={(value ?? "")} autoComplete="off">
                <option value="" className={`${defaultOptionHidden && "hidden"}`} >{defaultOption}</option>
                {options}
            </select>
            {error && <p className="error-box"><FontAwesomeIcon icon={faWarning}/> {error}</p>}
        </section>
    )
}

export default Select;