import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

const TipInput = ({placeholder = "", title = <></>, handleChange, error = "", value, name="", options=[]}) => {

    const [focus, setFocus] = useState(false);

    const filteredOptions = useMemo(() => {
        if(!value) {
            return options.filter((obj, index) => index <= 40).sort();
        }
        const regexp = new RegExp(value, "i")
        return options.filter((obj, index) => regexp.test(obj)).filter((obj, index) => index <= 40).sort()
    }, [value, options]);

    return (
        <section className="w-full relative">
            <p className="font-bold mb-1 text-lg">{title}</p>
            <input
                placeholder={placeholder}
                autoComplete="off"
                className="p-2 border-2 border-black rounded-md inline-block w-full relative"
                onChange={handleChange} value={(value ?? "")}
                name={name}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 100)}
            />
            {
                focus &&
                <section className="max-h-75 absolute z-10 bg-white text-xl w-full border-zinc-400 border-4 rounded-b-xl overflow-y-scroll">
                    {
                        filteredOptions.map((obj, index) => <p key={index} className="tipinput-option" data-value={obj} onClick={handleChange}>{obj}</p>)
                    }
                </section>
            }
            {error && <p className="error-box"><FontAwesomeIcon icon={faWarning}/> {error}</p>}
        </section>
    )
}

export default TipInput;