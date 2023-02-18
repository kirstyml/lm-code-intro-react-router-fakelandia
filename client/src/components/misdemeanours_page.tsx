import { MisdemeanoursContainer } from './misdemeanours_container';
import { useMisdemeanours, usePunishments } from './misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();
    const punishments = usePunishments();

    console.log(misdemeanours);

    return (
        <>
            <MisdemeanoursContainer misdemeanours={misdemeanours} punishments={punishments} />
        </>
    )
}