import React, { useState, useEffect, useContext } from 'react';
import { Misdemeanour, MisdemeanourKind, YourId } from '../types/misdemeanours.types';
import { Punishment } from '../types/punishment.types';

interface IMisdemeanoursContext {
    misdemeanours: Misdemeanour[] | undefined,
    punishments: Punishment[],
    addMisdemeanour: (misdemeanour: MisdemeanourKind) => void
}

export const MisdemeanoursContext = React.createContext<IMisdemeanoursContext>({ misdemeanours: [], punishments: [], addMisdemeanour: () => {}});

export const useMisdemeanours = () => {
    const { misdemeanours } = useContext(MisdemeanoursContext);
    return misdemeanours;
}

export const useAddMisdemeanour = () => {
    const { addMisdemeanour } = useContext(MisdemeanoursContext);
    return addMisdemeanour;
}

export const usePunishments = () => {
    const { punishments } = useContext(MisdemeanoursContext);
    return punishments;
}

export const MisdemeanoursProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[] | undefined>([]);
    const [punishments, setPunishments] = useState<Punishment[]>([]);

    // TODO: decide how amount is specified
    const amount = 10;

    useEffect(() => {
        getMisdemeanours(amount);
        getPunishments(amount);
    }, []);

    const getMisdemeanours = async (amount : number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/misdemeanours/${amount}`);
            if(response.status === 200 || response.status === 201) {
                const responseJSON = await response.json();
                setMisdemeanours(responseJSON.misdemeanours);
            } else {
                console.log(response);
                setMisdemeanours(undefined);
            }
        }
        catch (error) {
            console.log(error);
            setMisdemeanours(undefined);
        }
    };

    const addMisdemeanour = (misdemeanour : MisdemeanourKind) => {
        const newMisdemeanour =  {
            citizenId: 'YOU!' as YourId,
            misdemeanour: misdemeanour,
            date: new Date().toLocaleDateString()
        }
        console.log(newMisdemeanour);
        misdemeanours && setMisdemeanours([...misdemeanours, newMisdemeanour]);
    }

    const getPunishments = async (amount : number) => {
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${amount}`);
            if(response.status === 200 || response.status === 201) {
                const responseJSON = await response.json();
                setPunishments(responseJSON);
            } 
        }
        catch (error) {
            console.log(error);
        }
    };

    return(
        <MisdemeanoursContext.Provider value={{ misdemeanours, punishments, addMisdemeanour }}>
            {children}
        </MisdemeanoursContext.Provider>
    )
}