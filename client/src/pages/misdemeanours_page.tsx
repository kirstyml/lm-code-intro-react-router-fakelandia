import { MisdemeanoursContainer } from "../components/misdemeanours_container";
import { Select } from "../components/select";
import {
  useMisdemeanours,
  useMisdemeanoursError,
  useMisdemeanoursLoading,
} from "../context/misdemeanour_provider";
import { useFetchData } from "../hooks/useFetchData";
import { useFilter } from "../hooks/useFilter";
import { MISDEMEANOURS } from "../types/misdemeanours.types";
import { Punishment } from "../types/punishment.types";

export const Misdemeanours: React.FC = () => {
  const { filter, onChangeHandler } = useFilter();
  const misdemeanoursLoading = useMisdemeanoursLoading();
  const misdemeanours = useMisdemeanours();
  const { misdemeanourStatus } = useMisdemeanoursError();
  const filteredMisdemeanours =
    misdemeanours && filter !== ""
      ? misdemeanours.filter((m) => m.misdemeanour === filter)
      : misdemeanours;
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
      {!misdemeanoursLoading && filteredMisdemeanours && (
        <>
          <Select
            name="filter"
            value={filter}
            options={["", ...MISDEMEANOURS]}
            label="Filter misdemeanours by type"
            handleChange={onChangeHandler}
            error={undefined}
            touched={false}
          />
          <MisdemeanoursContainer
            misdemeanours={filteredMisdemeanours}
            punishments={punishments}
          />
        </>
      )}
      {!misdemeanoursLoading &&
        misdemeanourStatus !== 200 &&
        misdemeanourStatus !== 201 && (
          <p>
            Error: Something went wrong loading the data. Please check your
            connection and reload the app
          </p>
        )}
    </div>
  );
};
