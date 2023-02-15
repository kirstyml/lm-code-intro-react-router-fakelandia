import React, { useState, useEffect, useContext } from 'react';
import { Misdemeanour } from '../types/misdemeanours.types';

const MisdemeanoursContext = React.createContext<Misdemeanour[]>([]);

export const useMisdemeanours = () => useContext(MisdemeanoursContext);

export const MisdemeanoursProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
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

    return(
        <MisdemeanoursContext.Provider value={misdemeanours}>
            {children}
        </MisdemeanoursContext.Provider>
    )
}