import React from "react";
import { reasons, reasonOptions } from "../types/reasons.types";

export const ReasonsSelect : React.FC<{handleChange: (event : React.ChangeEvent<HTMLSelectElement>) => void}> = ({ handleChange }) => {
    return (
        <>
            <label htmlFor="reason">Reason for contact</label>
            <select name="reason" id="reason" onChange={handleChange}>
                {reasons.map(reason => <option value={reason}>{reason === "" ? "--Please select an option--" : reason === "talk" ? "I just want to talk" : reason}</option>)}
            </select>
        </>
    )
}