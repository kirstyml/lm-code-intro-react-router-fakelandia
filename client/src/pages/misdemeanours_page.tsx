import { MisdemeanoursContainer } from "../components/misdemeanours_container";
import {
  useMisdemeanours,
  useMisdemeanoursLoading,
} from "../context/misdemeanour_provider";
import { usePunishments } from "../hooks/usePunishments";

export const Misdemeanours: React.FC = () => {
  const misdemeanours = useMisdemeanours();
  const misdemeanoursLoading = useMisdemeanoursLoading();
  const punishments = misdemeanours ? usePunishments(misdemeanours) : [];

  return (
    <div>
      <h2>Misdemeanours</h2>
      {misdemeanoursLoading && <p>Loading Misdemeanours....</p>}
      {!misdemeanoursLoading && misdemeanours && (
        <MisdemeanoursContainer
          misdemeanours={misdemeanours}
          punishments={punishments}
        />
      )}
      {!misdemeanoursLoading && !misdemeanours && (
        <p>
          Error: Something went wrong loading the data. Please check your
          connection and reload the app
        </p>
      )}
    </div>
  );
};
