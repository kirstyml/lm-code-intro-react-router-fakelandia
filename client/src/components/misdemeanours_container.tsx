import { Misdemeanour } from '../types/misdemeanours.types';
import { MisdemeanourItem } from './misdemeanour';

export const MisdemeanoursContainer : React.FC<{misdemeanours: Misdemeanour[]}> = ({ misdemeanours }) => {
    return (
        <>
            <div className="misdemeanour_container">
                <div className="misdemeanour_container--headings misdemeanour">
                    <p className="misdemeanour__id">Citizen ID</p>
                    <p className="misdemeanour__date">Date</p>
                    <p className="misdemeanour__misdemeanour">Misdemeanour</p>
                </div>
                {
                    misdemeanours.map((item) => <MisdemeanourItem misdemeanour={item} />)
                }
            </div>
        </>

    )
}