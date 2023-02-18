import { Misdemeanour } from '../types/misdemeanours.types';
import { Punishment } from '../types/punishment.types';
import { MisdemeanourItem } from './misdemeanour';

export const MisdemeanoursContainer : React.FC<{misdemeanours: Misdemeanour[], punishments: Punishment[]}> = ({ misdemeanours, punishments }) => {
    return (
        <>
            <div className="misdemeanour_container">
                <div className="misdemeanour_container--headings misdemeanour">
                    <p className="misdemeanour__id">Citizen ID</p>
                    <p className="misdemeanour__date">Date</p>
                    <p className="misdemeanour__misdemeanour">Misdemeanour</p>
                    <p className="misdemeanour__punishment">Punishment Idea</p>
                </div>
                {
                    misdemeanours.map((item, index) => <MisdemeanourItem misdemeanour={item} punishment={punishments.length - index > 0 ? punishments[index] : punishments[0]} />)
                }
            </div>
        </>

    )
}