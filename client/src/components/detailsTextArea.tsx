import React, { useState } from "react";
import { ConfessionChangeHandler } from "../types/confession.types";

interface IDetailsTextArea {
    detailsText: string,
    handleChange: ConfessionChangeHandler,
    error: undefined | string
}

export const DetailsTextArea: React.FC<IDetailsTextArea> = ({ detailsText, handleChange, error }) => {
    const [touched, setTouched] = useState<boolean>(false);

    return (
        <>
            <textarea name="details" id="details" cols={30} rows={10} onChange={(event) => { setTouched(true); handleChange(event.target.value, "details") }} value={detailsText}></textarea>
            {error && touched && <p>Error: Details {error}</p>}
        </>
    )
}