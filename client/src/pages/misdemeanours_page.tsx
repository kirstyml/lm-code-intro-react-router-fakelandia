import { MisdemeanoursContainer } from "../components/misdemeanours_container";
import {
  useMisdemeanours,
  useMisdemeanoursError,
  useMisdemeanoursLoading,
} from "../context/misdemeanour_provider";
import { useFetchData } from "../hooks/useFetchData";
import { Punishment } from "../types/punishment.types";

export const Misdemeanours: React.FC = () => {
  const misdemeanours = useMisdemeanours();
  const misdemeanoursLoading = useMisdemeanoursLoading();
  const { misdemeanourStatus, misdemeanourError } = useMisdemeanoursError();
  const numberOfMisdemeanours = misdemeanours ? misdemeanours.length : 0;
  const { data, status } = useFetchData(
    `https://picsum.photos/v2/list?page=1&limit=${numberOfMisdemeanours}`
  );
  const punishments =
    status !== 200 && status !== 201 ? [] : (data as Punishment[]);

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
      {misdemeanourStatus !== 200 && misdemeanourStatus !== 201 && (
        <p>
          Error: Something went wrong loading the data. Please check your
          connection and reload the app
        </p>
      )}
    </div>
  );
};
