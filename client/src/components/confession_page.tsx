import React, { useState } from "react";
import { reasons, reasonOptions } from "../types/reasons.types";
import { ReasonsSelect } from "./reasonsSelect";

export const Confession : React.FC = () => {
    const [subject, setSubject] = useState("");
    const [reason, setReason] = useState<reasonOptions>("");
    const [details, setDetails] = useState("");

    const allValid = subject !== "" && reason !== "" && details.length > 10;

    const isReason = (input: string) : input is reasonOptions => {
        return reasons.includes(input as reasonOptions);
    }

    const handleReasonChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        if (isReason(event.target.value)) {
            setReason(event.target.value);
        }
    }

    return (
        <div>
            <p>It's very difficult to catch people committing misdemeanours 
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you're just having a hard day and need to vent then 
                you're welcome to contact us here too. Up to ypu!</p>
            <form action="">
                <label htmlFor="subject">Subject</label>
                <input name="subject" type="text" onChange={(event) => setSubject(event.target.value)} />
                <ReasonsSelect handleChange={handleReasonChange} />
                <textarea name="details" id="" cols={30} rows={10} onChange={(event) => setDetails(event.target.value)}></textarea>
                <input type="submit" value="Confess" disabled={!allValid} />
            </form>
        </div>
    )
}