import React from "react";
import { reasons, reasonOptions } from "../types/reasons.types";

interface IReasonsSelect {
    selectedReason: reasonOptions,
    handleChange : (event : React.ChangeEvent<HTMLSelectElement>) => void,
}

export const ReasonsSelect : React.FC<IReasonsSelect> = ({ selectedReason, handleChange }) => {
    return (
        <>
            <label htmlFor="reason">Reason for contact</label>
            <select name="reason" id="reason" value={selectedReason} onChange={handleChange}>
                {reasons.map(reason => <option key={reason} value={reason}>{
                    reason === "" ? "--Please select an option--" : reason === "just-talk" ? "I just want to talk" : reason
                }</option>)}
            </select>
        </>
    )
}