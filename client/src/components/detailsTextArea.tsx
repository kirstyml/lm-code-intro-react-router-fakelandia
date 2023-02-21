import React from "react";

interface IDetailsTextArea {
    detailsText: string,
    handleChange : (event : React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const DetailsTextArea : React.FC<IDetailsTextArea> = ({ detailsText, handleChange }) => {
    return (
        <textarea name="details" id="" cols={30} rows={10} onChange={(event) => handleChange(event)} value={detailsText}></textarea>
    )
}