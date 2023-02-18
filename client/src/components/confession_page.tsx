import React, { useState } from "react";
import { ConfessionResponse } from "../types/confession.types";
import { reasons, reasonOptions } from "../types/reasons.types";
import { useAddMisdemeanour } from "./misdemeanour_provider";
import { ReasonsSelect } from "./reasonsSelect";
import { SubjectInput } from "./subjectInput";

export const Confession : React.FC = () => {
    const [subject, setSubject] = useState("");
    const [reason, setReason] = useState<reasonOptions>("");
    const [details, setDetails] = useState("");
    const [errors, setErrors] = useState({subject: false, reason: false, details: false});
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const updateMisdemeanours = useAddMisdemeanour();


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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //validate entries ? or no need as submit button disabled until then?
        // fetch call to send the data
        const body = JSON.stringify({
            subject: subject,
            reason: reason,
            details: details,
          });
        try {
            const response = await fetch(`http://localhost:8080/api/confess`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: body,
              }); 
            const responseJSON = await response.json() as ConfessionResponse;
            console.log(responseJSON);
            // failure - show error message
            if (responseJSON.success) {
                if (!responseJSON.justTalked && reason !== 'just-talk' && reason !== "") {
                    //add the misdemeanour to the state
                    updateMisdemeanours(reason);
                }
            } else {
                setSubmitError(responseJSON.message);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <p>It's very difficult to catch people committing misdemeanours 
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you're just having a hard day and need to vent then 
                you're welcome to contact us here too. Up to ypu!</p>
            <form onSubmit={handleSubmit}>
                <SubjectInput handleChange={handleSubjectChange} />
                {errors.subject && <p>Error: You must enter a subject</p>}
                <ReasonsSelect handleChange={handleReasonChange} />
                {errors.reason && <p>Error: You must select a reason from the dropdown</p>}
                <textarea name="details" id="" cols={30} rows={10} onChange={(event) => handleDetailsChange(event)}></textarea>
                {errors.details && <p>Error: You must enter at least 20 characters in the details section</p>}
                <input type="submit" value="Confess" disabled={!allValid} />
                {submitError && <p>Error: {submitError} </p>}
            </form>
        </div>
    )
}