import { useState, useEffect } from 'react';
import { Misdemeanour } from '../types/misdemeanours.types';

export const Misdemeanours : React.FC = () => {
    const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);

    useEffect(() => {
        getMisdemeanours();
    }, []);

    const getMisdemeanours = async () => {
        // TODO: decide how amount is specified
        const amount = 2;
        const response = await fetch(`http://localhost:8080/api/misdemeanours/${amount}`);
        const responseJSON = await response.json();
        setMisdemeanours(responseJSON.misdemeanours);
    };

    return (
        <>
        {
            misdemeanours.map((misdemeanour) => {
                return(
                    // Refactor misdemeanour into component
                    <div>
                        <p>{misdemeanour.citizenId}</p>
                        <p>{misdemeanour.misdemeanour}</p>
                        <p>{misdemeanour.date}</p>
                    </div>
                )
            })
        }
        </>
    )
}