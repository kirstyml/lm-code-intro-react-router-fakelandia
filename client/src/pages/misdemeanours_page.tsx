import { MisdemeanoursContainer } from '../components/misdemeanours_container';
import { useMisdemeanours, usePunishments } from '../context/misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();
    const punishments = usePunishments();

    return (
        <section>
            {misdemeanours && <MisdemeanoursContainer misdemeanours={misdemeanours} punishments={punishments} />}
            {!misdemeanours && <p>Error: Something went wrong loading the data. Please check your connection and reload the app</p>}
        </section>
    )
}