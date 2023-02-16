interface ISubjectInput {
    handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

export const SubjectInput : React.FC<ISubjectInput> = ({ handleChange }) => {
    return (
        <>
            <label htmlFor="subject">Subject</label>
            <input name="subject" type="text" onChange={handleChange} />
        </>
    )
}