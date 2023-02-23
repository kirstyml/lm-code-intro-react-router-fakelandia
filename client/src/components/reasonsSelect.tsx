import React from "react";
import { ConfessionChangeHandler } from "../types/confession.types";
import { reasons, reasonOptions } from "../types/reasons.types";

interface IReasonsSelect {
    selectedReason: reasonOptions,
    handleChange : ConfessionChangeHandler
}

export const ReasonsSelect : React.FC<IReasonsSelect> = ({ selectedReason, handleChange }) => {
    return (
        <>
            <label htmlFor="reason">Reason for contact</label>
            <select name="reason" id="reason" value={selectedReason} onChange={(e) => handleChange(e.target.value as reasonOptions, "reason")}>
                {reasons.map(reason => <option key={reason} value={reason}>{
                    reason === "" ? "--Please select an option--" : reason === "just-talk" ? "I just want to talk" : reason
                }</option>)}
            </select>
        </>
    )
}