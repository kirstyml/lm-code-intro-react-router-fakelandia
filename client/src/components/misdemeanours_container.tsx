import { Misdemeanour } from '../types/misdemeanours.types';
import { MisdemeanourItem } from './misdemeanour';

export const MisdemeanoursContainer : React.FC<{misdemeanours: Misdemeanour[]}> = ({ misdemeanours }) => {
    return (
        <>
            {
                misdemeanours.map((item) => <MisdemeanourItem misdemeanour={item} />)
            }
        </>
    )
}