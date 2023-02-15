import { Misdemeanour } from "../types/misdemeanours.types"

export const MisdemeanourItem : React.FC<{ misdemeanour: Misdemeanour}> = ({ misdemeanour }) => {
    return(
        <div>
            <p>{misdemeanour.citizenId}</p>
            <p>{misdemeanour.misdemeanour}</p>
            <p>{misdemeanour.date}</p>
        </div>
    )
}