import { Misdemeanour } from "../types/misdemeanours.types"

export const MisdemeanourItem : React.FC<{ misdemeanour: Misdemeanour}> = ({ misdemeanour }) => {
    return(
        <div className="misdemeanour">
            <p className="misdemeanour__id">{misdemeanour.citizenId}</p>
            <p className="misdemeanour__date">{misdemeanour.date}</p>
            <p className="misdemeanour__misdemeanour">{misdemeanour.misdemeanour}</p>       
        </div>
    )
}