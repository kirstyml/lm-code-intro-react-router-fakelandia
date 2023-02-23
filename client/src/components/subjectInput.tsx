import { ConfessionChangeHandler } from "../types/confession.types"

interface ISubjectInput {
    inputValue : string,
    handleChange : ConfessionChangeHandler
}

export const SubjectInput : React.FC<ISubjectInput> = ({ inputValue, handleChange } : ISubjectInput) => {
    return (
        <>
            <label htmlFor="subject">Subject</label>
            <input name="subject" id="subject" type="text" onChange={(e) => handleChange(e.target.value, "subject")} value={inputValue} />
        </>
    )
}