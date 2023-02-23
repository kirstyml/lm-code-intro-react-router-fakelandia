import React, { useState } from "react";
import { ConfessionData, ConfessionResponse, ConfessionChangeHandler } from "../types/confession.types";
import { useAddMisdemeanour } from "../context/misdemeanour_provider";
import { ReasonsSelect } from "../components/reasonsSelect";
import { SubjectInput } from "../components/subjectInput";
import { DetailsTextArea } from "../components/detailsTextArea";
import { detailsValidation, reasonValidation, subjectValidation } from "../validation/confession_validation";

const defaultConfessionData : ConfessionData = {
    subject: "",
    reason: "",
    details: "",
};

export const Confession: React.FC = () => {
    const [confessionData, setConfessionData] = useState<ConfessionData>(defaultConfessionData)
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

    // const allValid = confessionData.subject && confessionData.reason && confessionData.details.length > 20;
    const subjectError = subjectValidation(confessionData.subject);
    const reasonError = reasonValidation(confessionData.reason);
    const detailsError = detailsValidation(confessionData.details);
    const allValid = !subjectError && !reasonError && !detailsError;

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
                you&apos;re welcome to contact us here too. Up to you!</p>
            <form onSubmit={handleSubmit} className="confession-form">
                <SubjectInput inputValue={confessionData.subject} handleChange={onChangeHandler} error={subjectError} />
                <ReasonsSelect selectedReason={confessionData.reason} handleChange={onChangeHandler} error={reasonError} />
                <DetailsTextArea detailsText={confessionData.details} handleChange={onChangeHandler} error={detailsError}/>
                <input type="submit" value="Confess" disabled={!allValid} className="confession-form__submit" />
                {submitError && <p className="confession-form__error">Error: The confession has not been submitted. Details: {submitError} </p>}
            </form>
        </div>
    )
}