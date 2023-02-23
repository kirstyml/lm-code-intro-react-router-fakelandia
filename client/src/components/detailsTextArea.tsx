import React from "react";
import { ConfessionChangeHandler } from "../types/confession.types";

interface IDetailsTextArea {
    detailsText: string,
    handleChange : ConfessionChangeHandler
}

export const DetailsTextArea : React.FC<IDetailsTextArea> = ({ detailsText, handleChange }) => {
    return (
        <textarea name="details" id="details" cols={30} rows={10} onChange={(event) => handleChange(event.target.value, "details")} value={detailsText}></textarea>
    )
}