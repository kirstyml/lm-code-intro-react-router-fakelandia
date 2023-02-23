import { useState } from "react";
import { ConfessionChangeHandler } from "../types/confession.types"

interface ISubjectInput {
    inputValue : string,
    handleChange : ConfessionChangeHandler,
    error: undefined | string
}

export const SubjectInput : React.FC<ISubjectInput> = ({ inputValue, handleChange, error } : ISubjectInput) => {
    const [touched, setTouched] = useState<boolean>(false);
    return (
        <div className="confession-form__question">
            <label htmlFor="subject" className="confession-form__label">Subject</label>
            <input name="subject" id="subject" type="text" onChange={(e) => {setTouched(true); handleChange(e.target.value, "subject")}} value={inputValue} className="confession-form__field" />
            {error && touched && <p className="confession-form__error">Error: Subject {error}</p>}
        </div>
    )
}