import { Misdemeanour } from "../types/misdemeanours.types";
import { Punishment } from "../types/punishment.types";

interface IMisdemeanourItem {
    misdemeanour: Misdemeanour,
    punishment: Punishment
}

export const MisdemeanourItem : React.FC<IMisdemeanourItem> = ({ misdemeanour , punishment } : IMisdemeanourItem) => {
    return(
        <div className="misdemeanour">
            <p className="misdemeanour__id">{misdemeanour.citizenId}</p>
            <p className="misdemeanour__date">{misdemeanour.date}</p>
            <p className="misdemeanour__misdemeanour">{misdemeanour.misdemeanour}</p>
            {punishment ? <img className="misdemeanour__punishment" src={`https://picsum.photos/id/${punishment.id}/100`} alt="punishment idea" /> : <p>?</p>}     
        </div>
    )
}