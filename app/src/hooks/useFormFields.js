import { useEffect, useState } from "react"

const useFormFields = (fields) => {
    const [fieldData, setFieldData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newFieldData = {};
        [...fields].forEach(obj => {
            if(obj.allowNull) {
                newFieldData[obj.name] = "";
            }
        });
        setFieldData(newFieldData);
    }, [])

    useEffect(() => {
        setErrors({});
        Object.keys(fieldData).forEach((obj) => {
            const field = [...fields].find(field => field.name == obj);
            if(!fieldData[obj]) {
                if(!field.allowNull) {
                    setErrors((prev) => ({...prev, [obj]:"Wymagane"}))
                    return;
                }
            } else {
                if(field.regexp) {
                    if(!fieldData[obj].match(field.regexp)) {
                        setErrors((prev) => ({...prev, [obj]:field.errorText ?? "Nie poprawne dane"}))
                    }
                }
            }
        })
    }, [fieldData]);

    const isValidated = () => {
        if(Object.keys(fieldData).length == [...fields].length && Object.keys(errors) == 0) {
            return true;
        } else {
            const newFieldData = {...fieldData};
            [...fields].forEach(obj => {
                if(!fieldData[obj.name]) {
                    newFieldData[obj.name] = "";
                }
            });
            setFieldData(newFieldData);
            return false;
        }
    }
    return [setFieldData, fieldData, errors, setErrors, isValidated]
}

export default useFormFields;