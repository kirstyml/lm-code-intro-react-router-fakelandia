interface ISubjectInput {
    inputValue : string,
    handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

export const SubjectInput : React.FC<ISubjectInput> = ({ inputValue, handleChange }) => {
    return (
        <>
            <label htmlFor="subject">Subject</label>
            <input name="subject" id="subject" type="text" onChange={handleChange} value={inputValue} />
        </>
    )
}