
import SearchBarLayout from "../../layouts/SearchBarLayout"
import Input from "../inputs/Input"


const OwnersSearch = ({setFieldData, fieldData, errors, isValidated, onClose = () => {}, onSubmit = () => {}}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidated()) {
            onSubmit()
        }
    }
    return (
        <SearchBarLayout onClose={onClose} onSubmit={handleSubmit}>
            <Input
                placeholder="Podaj imie/nazwisko"
                title="Imie/nazwisko"
                error={errors.nameFilter}
                handleChange={(e) => setFieldData((prev) => ({...prev, nameFilter:e.target.value.toUpperCase()}))}
                value={fieldData.nameFilter}
            />
            <Input
                placeholder="Podaj limit wyników"
                title="Limit wyników"
                error={errors.limit}
                handleChange={(e) => setFieldData((prev) => ({...prev, limit:e.target.value.toUpperCase()}))}
                value={fieldData.limit}
            />
        </SearchBarLayout>
    )
}

export default OwnersSearch;