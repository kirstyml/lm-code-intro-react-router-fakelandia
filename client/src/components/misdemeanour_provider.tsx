import React, { useState, useEffect, useContext } from 'react';
import { Misdemeanour } from '../types/misdemeanours.types';
import { Punishment } from '../types/punishment.types';



const MisdemeanoursContext = React.createContext<{ misdemeanours: Misdemeanour[], punishments: Punishment[]}>({ misdemeanours: [], punishments: []});

export const useMisdemeanours = () => {
    const { misdemeanours } = useContext(MisdemeanoursContext);
    return misdemeanours;
}

export const usePunishments = () => {
    const { punishments } = useContext(MisdemeanoursContext);
    return punishments;
}

export const MisdemeanoursProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
    const [punishments, setPunishments] = useState<Punishment[]>([]);

    // TODO: decide how amount is specified
    const amount = 10;

    useEffect(() => {
        getMisdemeanours(amount);
        getPunishments(amount);
    }, []);

    const getMisdemeanours = async (amount : number) => {
        const response = await fetch(`http://localhost:8080/api/misdemeanours/${amount}`);
        const responseJSON = await response.json();
        setMisdemeanours(responseJSON.misdemeanours);
    };

    const getPunishments = async (amount : number) => {
        const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${amount}`);
        const responseJSON = await response.json();
        setPunishments(responseJSON);
    };

    return(
        <MisdemeanoursContext.Provider value={{ misdemeanours, punishments }}>
            {children}
        </MisdemeanoursContext.Provider>
    )
}