import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({type = "text", placeholder = "", title = <></>, handleChange, error = "", value, name="", step="1", min, max}) => {
    return (
        <section className="w-full">
            <p className="font-bold mb-1 text-lg">{title}</p>
            <input type={type}
                placeholder={placeholder}
                autoComplete="off"
                className="p-2 border-2 border-black rounded-md inline-block w-full"
                onChange={handleChange} value={(value ?? "")}
                name={name}
                step={step}
                min={min}
                max={max}
            />
            {error && <p className="error-box"><FontAwesomeIcon icon={faWarning}/> {error}</p>}
        </section>
    )
}

export default Input;

