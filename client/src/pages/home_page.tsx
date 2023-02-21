import { useMisdemeanours, useMisdemeanoursLoading } from "../context/misdemeanour_provider";

export const Home : React.FC = () => {
    const misdemeanours = useMisdemeanours();
    const isLoading = useMisdemeanoursLoading();

    const yourMisdemeanours = misdemeanours && misdemeanours.filter(misdemeanour => misdemeanour.citizenId === "YOU!");

    return (
    <div>
        <section>
            <h2>Welcome</h2>
            <p>Welcome to the home of the Justice Department of Fakelandia</p>
            <p>Here you can browse a list of recent misdemeanours committed by our citizens or you can confess your own misdemeanour</p>
        </section>
        <section>
            <h2>Statistics</h2>
            <p>Total number of misdemeanours:</p>
            {isLoading && <p>Data Loading</p>}
            {!isLoading && <p>{misdemeanours ? misdemeanours.length : "Error loading misdemeanour data"}</p>}
            <p>Total number of YOUR misdemeanours:</p>
            {isLoading && <p>Data Loading</p>}
            {!isLoading && <p>{yourMisdemeanours ? yourMisdemeanours.length : "Error loading misdemeanour data"}</p>}
        </section>
    </div>
    )
}