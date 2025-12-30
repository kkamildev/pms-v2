import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextArea = ({placeholder = "", title = <></>, handleChange, error = "", value}) => {
    return (
        <section className="w-full">
            <p className="font-bold mb-1 text-lg">{title}</p>
            <textarea
                placeholder={placeholder}
                autoComplete="off"
                className="p-2 border-2 border-black rounded-md inline-block w-full resize-none h-25"
                onChange={handleChange} value={(value ?? "")}
            ></textarea>
            {error && <p className="error-box"><FontAwesomeIcon icon={faWarning}/> {error}</p>}
        </section>
    )
}

export default TextArea;

