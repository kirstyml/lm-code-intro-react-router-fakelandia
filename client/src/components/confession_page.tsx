import React, { useState } from "react";
import { reasons, reasonOptions } from "../types/reasons.types";
import { ReasonsSelect } from "./reasonsSelect";
import { SubjectInput } from "./subjectInput";

export const Confession : React.FC = () => {
    const [subject, setSubject] = useState("");
    const [reason, setReason] = useState<reasonOptions>("");
    const [details, setDetails] = useState("");
    const [errors, setErrors] = useState({subject: false, reason: false, details: false});


    const subjectValid = subject !== "";
    const reasonValid = reason !== "";
    const detailsValid = details.length > 20;
    const allValid = subjectValid && reasonValid && detailsValid;

    const isReason = (input: string) : input is reasonOptions => {
        return reasons.includes(input as reasonOptions);
    }

    const handleReasonChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        if (isReason(event.target.value)) {
            setReason(event.target.value);
        }
    }

    const handleSubjectChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    }

    const handleDetailsChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(event.target.value);
        event.target.value.length < 20 ? setErrors({...errors, details: true }) : setErrors({...errors, details: false });
    }

    return (
        <div>
            <p>It's very difficult to catch people committing misdemeanours 
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you're just having a hard day and need to vent then 
                you're welcome to contact us here too. Up to ypu!</p>
            <form action="">
                <SubjectInput handleChange={handleSubjectChange} />
                {errors.subject && <p>Error: You must enter a subject</p>}
                <ReasonsSelect handleChange={handleReasonChange} />
                {errors.reason && <p>Error: You must select a reason from the dropdown</p>}
                <textarea name="details" id="" cols={30} rows={10} onChange={(event) => handleDetailsChange(event)}></textarea>
                {errors.details && <p>Error: You must enter at least 20 characters in the details section</p>}
                <input type="submit" value="Confess" disabled={!allValid} />
            </form>
        </div>
    )
}