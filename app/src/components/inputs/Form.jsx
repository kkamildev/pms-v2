


const Form = ({onSubmit, className = "", children}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e)
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    return (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className={className}>
            {children}
        </form>
    )
}

export default Form;