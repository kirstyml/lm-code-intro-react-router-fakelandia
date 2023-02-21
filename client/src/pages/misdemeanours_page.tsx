import { MisdemeanoursContainer } from '../components/misdemeanours_container';
import { useMisdemeanours, useMisdemeanoursLoading, usePunishments } from '../context/misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();
    const punishments = usePunishments();
    const misdemeanoursLoading = useMisdemeanoursLoading();

    return (
        <div>
            {misdemeanoursLoading && <p>Loading....</p>}
            {!misdemeanoursLoading && misdemeanours && <MisdemeanoursContainer misdemeanours={misdemeanours} punishments={punishments} />}
            {!misdemeanoursLoading && !misdemeanours && <p>Error: Something went wrong loading the data. Please check your connection and reload the app</p>}
        </div>
    )
}