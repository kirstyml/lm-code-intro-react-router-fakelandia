import React from "react";
import { reasons, reasonOptions } from "../types/reasons.types";

interface IReasonsSelect {
    handleChange : (event : React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ReasonsSelect : React.FC<IReasonsSelect> = ({ handleChange }) => {
    return (
        <>
            <label htmlFor="reason">Reason for contact</label>
            <select name="reason" id="reason" onChange={handleChange}>
                {reasons.map(reason => <option value={reason}>{reason === "" ? "--Please select an option--" : reason === "just-talk" ? "I just want to talk" : reason}</option>)}
            </select>
        </>
    )
}