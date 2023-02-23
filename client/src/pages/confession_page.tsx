import React, { useState } from "react";
import { ConfessionData, ConfessionResponse, ConfessionChangeHandler } from "../types/confession.types";
import { reasons, reasonOptions } from "../types/reasons.types";
import { useAddMisdemeanour } from "../context/misdemeanour_provider";
import { ReasonsSelect } from "../components/reasonsSelect";
import { SubjectInput } from "../components/subjectInput";
import { DetailsTextArea } from "../components/detailsTextArea";

const defaultConfessionData : ConfessionData = {
    subject: "",
    reason: "",
    details: "",
};

export const Confession: React.FC = () => {
    const [confessionData, setConfessionData] = useState<ConfessionData>(defaultConfessionData)
    const [inputErrors, setInputErrors] = useState({ subject: false, reason: false, details: false });
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);

    const updateMisdemeanours = useAddMisdemeanour();

    const resetForm = () => {
        setConfessionData(defaultConfessionData);
    }

    const onChangeHandler : ConfessionChangeHandler = (value, name) => {
        const newData = {...confessionData};
        newData[name] = value;
        setConfessionData(newData);
    };

    const allValid = confessionData.subject && confessionData.reason && confessionData.details.length > 20;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (allValid) {
            const body = JSON.stringify(confessionData);
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
                    if (!responseJSON.justTalked && confessionData.reason !== 'just-talk' && confessionData.reason !== "") {
                        updateMisdemeanours(confessionData.reason);
                        alert("Your confession has been received.");
                        resetForm();
                    } else {
                        alert("Thanks for chatting - hope you feel better!");
                        resetForm();
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
        <div>
            <h2>Confess!</h2>
            <p>It&apos;s very difficult to catch people committing misdemeanours
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you&apos;re just having a hard day and need to vent then
                you&apos;re welcome to contact us here too. Up to ypu!</p>
            <form onSubmit={handleSubmit}>
                <SubjectInput inputValue={confessionData.subject} handleChange={onChangeHandler} />
                {inputErrors.subject && <p>Error: You must enter a subject</p>}
                <ReasonsSelect selectedReason={confessionData.reason} handleChange={onChangeHandler} />
                {inputErrors.reason && <p>Error: You must select a reason from the dropdown</p>}
                <DetailsTextArea detailsText={confessionData.details} handleChange={onChangeHandler} />
                {inputErrors.details && <p>Error: You must enter at least 20 characters in the details section</p>}
                <input type="submit" value="Confess" disabled={!allValid} />
                {submitError && <p>Error: The confession has not been submitted. Details: {submitError} </p>}
            </form>
        </div>
    )
}