import { useMisdemeanours } from './misdemeanour_provider';

export const Misdemeanours : React.FC = () => {
    const misdemeanours = useMisdemeanours();

    return (
        <>
        {
            misdemeanours.map((misdemeanour) => {
                return(
                    // Refactor misdemeanour into component
                    <div>
                        <p>{misdemeanour.citizenId}</p>
                        <p>{misdemeanour.misdemeanour}</p>
                        <p>{misdemeanour.date}</p>
                    </div>
                )
            })
        }
        </>
    )
}