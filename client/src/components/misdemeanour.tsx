import { Misdemeanour } from "../types/misdemeanours.types"
import { Punishment } from "../types/punishment.types"

export const MisdemeanourItem : React.FC<{ misdemeanour: Misdemeanour, punishment: Punishment}> = ({ misdemeanour, punishment }) => {
    return(
        <div className="misdemeanour">
            <p className="misdemeanour__id">{misdemeanour.citizenId}</p>
            <p className="misdemeanour__date">{misdemeanour.date}</p>
            <p className="misdemeanour__misdemeanour">{misdemeanour.misdemeanour}</p>
            <img className="misdemeanour__punishment" src={`https://picsum.photos/id/${punishment.id}/100`} />      
        </div>
    )
}