import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateDataStore } from "../../../hooks/stores";
import useApi from "../../../hooks/useApi";
import useFormFields from "../../../hooks/useFormFields";
import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Form from "../../inputs/Form"


const UpdateGroundClass = ({onClose = () => {}, reload = () => {}}) => {
    const {put, get} = useApi();

    const groundClassData = useUpdateDataStore((state) => state.data);

    const [setFieldData, fieldData, errors, setErrors, isValidated] = useFormFields([
        {
            name:"groundClass",
            allowNull:false,
            regexp:/^.{1,10}$/,
            errorText:"Za długi"
        },
        {
            name:"converter1",
            allowNull:false,
            regexp:/^\d{0,1}.\d{0,2}$/,
            errorText:"Nie poprawny (2 miejsca po przecinku)",
            defaultValue:"1"
        },
        {
            name:"converter2",
            allowNull:false,
            regexp:/^\d{0,1}.\d{0,2}$/,
            errorText:"Nie poprawny (2 miejsca po przecinku)",
            defaultValue:"1"
        },
        {
            name:"converter3",
            allowNull:false,
            regexp:/^\d{0,1}.\d{0,2}$/,
            errorText:"Nie poprawny (2 miejsca po przecinku)",
            defaultValue:"1"
        },
        {
            name:"converter4",
            allowNull:false,
            regexp:/^\d{0,1}.\d{0,2}$/,
            errorText:"Nie poprawny (2 miejsca po przecinku)",
            defaultValue:"1"
        },
        {
            name:"tax",
            allowNull:false,
            regexp:/^(rolny|lesny|brak)$/,
            errorText:"Nie poprawny"
        },
        {
            name:"released",
            allowNull:false,
            regexp:/^(true|false)$/,
            errorText:"Nie poprawny",
        },
    ]);

    useEffect(() => {
        setFieldData({
            groundClass:groundClassData.class,
            tax:groundClassData.tax,
            released:`${groundClassData.released}`,
            converter1:`${groundClassData.converters[0].converter}`,
            converter2:`${groundClassData.converters[1].converter}`,
            converter3:`${groundClassData.converters[2].converter}`,
            converter4:`${groundClassData.converters[3].converter}`,
        });
    }, []);

    useEffect(() => {
        if(fieldData.tax && fieldData.tax != "rolny") {
            setFieldData((prev) => ({
                ...prev,
                converter1:"1",
                converter2:"1",
                converter3:"1",
                converter4:"1"
            }))
        }
    }, [fieldData.tax])

    const handleSubmit = (e) => {
        const updation = async () => {
            const converters = [
                fieldData.converter1,
                fieldData.converter2,
                fieldData.converter3,
                fieldData.converter4
            ]
            await put("/api/ground-classes/update", {
                groundClass:fieldData.groundClass,
                tax:fieldData.tax,
                convertersData:converters,
                released:fieldData.released,
                idGroundClass:groundClassData.id
            })
            onClose();
            reload()
        }
        if(isValidated()) {
            updation()
        }
    }

    useEffect(() => {
        if(fieldData.groundClass && fieldData.groundClass != groundClassData.class && fieldData.groundClass.length > 1) {
            get("/api/ground-classes/count?groundClass=" + fieldData.groundClass, (res) => {
                if(res.data.count > 0) {
                    setErrors((prev) => ({...prev, groundClass:"Już taka klasa gruntu istnieje"}))
                } 
            })
        }
    }, [fieldData.groundClass])
    

    return (
        <Form onSubmit={handleSubmit} className="w-[33%] border-l-4 border-l-green-700 p-5 flex flex-col items-center overflow-auto">
            <button className="error-btn m-2" onClick={onClose}><FontAwesomeIcon icon={faXmark}/> Zamknij</button>
            <h1 className="text-2xl font-bold">Edycja klasy gruntu</h1>
            <section className="my-4 gap-y-2 flex flex-col w-[80%]">
                <Select
                    title="Rodzaj klasy gruntu"
                    defaultOption="Nie wybrano"
                    options={
                        <>
                            <option value="rolny">Rolna</option>
                            <option value="lesny">Leśna</option>
                            <option value="brak">Inna</option>
                        
                        </>
                    }
                    error={errors.tax}
                    value={fieldData.tax}
                    handleChange={(e) => setFieldData((prev) => ({...prev, tax:e.target.value}))}
                />

                <Input
                    title="Nazwa klasy"
                    placeholder="Podaj nazwe klasy"
                    error={errors.groundClass}
                    value={fieldData.groundClass}
                    handleChange={(e) => setFieldData((prev) => ({...prev, groundClass:e.target.value}))}
                />

                {
                    fieldData.tax == "rolny" && <>
                        <Select
                            title="Zwolniona z podatku"
                            error={errors.released}
                            value={fieldData.released}
                            options={<>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </>}
                            handleChange={(e) => setFieldData((prev) => ({...prev, released:e.target.value}))}
                        />
                        <Input
                            type="number"
                            min="0"
                            title="Przelicznik okręgu I"
                            placeholder="Podaj przelicznik"
                            step="any"
                            error={errors.converter1}
                            value={fieldData.converter1}
                            handleChange={(e) => setFieldData((prev) => ({...prev, converter1:e.target.value}))}
                        />
                        <Input
                            type="number"
                            min="0"
                            title="Przelicznik okręgu II"
                            placeholder="Podaj przelicznik"
                            step="any"
                            error={errors.converter2}
                            value={fieldData.converter2}
                            handleChange={(e) => setFieldData((prev) => ({...prev, converter2:e.target.value}))}
                        />
                        <Input
                            type="number"
                            min="0"
                            title="Przelicznik okręgu III"
                            placeholder="Podaj przelicznik"
                            step="any"
                            error={errors.converter3}
                            value={fieldData.converter3}
                            handleChange={(e) => setFieldData((prev) => ({...prev, converter3:e.target.value}))}
                        />
                        <Input
                            type="number"
                            min="0"
                            title="Przelicznik okręgu IV"
                            placeholder="Podaj przelicznik"
                            step="any"
                            error={errors.converter4}
                            value={fieldData.converter4}
                            handleChange={(e) => setFieldData((prev) => ({...prev, converter4:e.target.value}))}
                        />
                    </>
                }
            </section>
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={faPlus}/> Dodaj</button>
        </Form>
    )
}

export default UpdateGroundClass;