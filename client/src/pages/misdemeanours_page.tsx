import { MisdemeanoursContainer } from '../components/misdemeanours_container';
import { useMisdemeanours, usePunishments } from '../context/misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();
    const punishments = usePunishments();

    return (
        <section>
            <MisdemeanoursContainer misdemeanours={misdemeanours} punishments={punishments} />
        </section>
    )
}