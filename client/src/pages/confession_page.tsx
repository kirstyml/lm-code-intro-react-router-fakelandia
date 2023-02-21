import React, { useState } from "react";
import { ConfessionResponse } from "../types/confession.types";
import { reasons, reasonOptions } from "../types/reasons.types";
import { useAddMisdemeanour } from "../context/misdemeanour_provider";
import { ReasonsSelect } from "../components/reasonsSelect";
import { SubjectInput } from "../components/subjectInput";
import { DetailsTextArea } from "../components/detailsTextArea";

export const Confession: React.FC = () => {
    const [subject, setSubject] = useState("");
    const [reason, setReason] = useState<reasonOptions>("");
    const [details, setDetails] = useState("");
    const [inputErrors, setInputErrors] = useState({ subject: false, reason: false, details: false });
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);

    const updateMisdemeanours = useAddMisdemeanour();

    const isReason = (input: string): input is reasonOptions => {
        return reasons.includes(input as reasonOptions);
    }

    const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (isReason(event.target.value)) {
            setReason(event.target.value);
            event.target.value === "" ? setInputErrors({ ...inputErrors, reason: true }) : setInputErrors({ ...inputErrors, reason: false });
        }
    }

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
        event.target.value.length < 1 ? setInputErrors({ ...inputErrors, subject: true }) : setInputErrors({ ...inputErrors, subject: false });
    }

    const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(event.target.value);
        event.target.value.length < 20 ? setInputErrors({ ...inputErrors, details: true }) : setInputErrors({ ...inputErrors, details: false });
    }

    const allValid = subject && reason && details.length > 20;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (allValid) {
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
                if (responseJSON.success) {
                    if (!responseJSON.justTalked && reason !== 'just-talk') {
                        updateMisdemeanours(reason);
                    }
                } else {
                    setSubmitError(responseJSON.message);
                }
            } catch (error) {
                if (typeof error === 'string') {
                    setSubmitError(error);
                } else if (error instanceof Error) {
                    setSubmitError(error.message);
                }
            }
        }
    }

    return (
        <section>
            <p>It's very difficult to catch people committing misdemeanours
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you're just having a hard day and need to vent then
                you're welcome to contact us here too. Up to ypu!</p>
            <form onSubmit={handleSubmit}>
                <SubjectInput inputValue={subject} handleChange={handleSubjectChange} />
                {inputErrors.subject && <p>Error: You must enter a subject</p>}
                <ReasonsSelect selectedReason={reason} handleChange={handleReasonChange} />
                {inputErrors.reason && <p>Error: You must select a reason from the dropdown</p>}
                <DetailsTextArea detailsText={details} handleChange={handleDetailsChange} />
                {inputErrors.details && <p>Error: You must enter at least 20 characters in the details section</p>}
                <input type="submit" value="Confess" disabled={!allValid} />
                {submitError && <p>Error: The confession has not been submitted. Details: {submitError} </p>}
            </form>
        </section>
    )
}