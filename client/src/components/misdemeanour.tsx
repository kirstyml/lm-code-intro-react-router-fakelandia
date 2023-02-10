import { useState } from 'react';
import { Misdemeanour } from '../types/misdemeanours.types';

export const Misdemeanours : React.FC = () => {
    const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);

    const getMisdemeanours = async () => {
        const amount = 2;
        const response = await fetch(`http://localhost:8080/api/misdemeanours/${amount}`);
        const responseJSON = await response.json();
        setMisdemeanours(responseJSON.misdemeanours);
    };

    return (
        <>Misdemeanours!</>
    )
}