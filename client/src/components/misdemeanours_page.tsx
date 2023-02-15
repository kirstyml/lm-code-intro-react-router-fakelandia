import { MisdemeanoursContainer } from './misdemeanours_container';
import { useMisdemeanours } from './misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();

    return (
        <>
            <MisdemeanoursContainer misdemeanours={misdemeanours} />
        </>
    )
}