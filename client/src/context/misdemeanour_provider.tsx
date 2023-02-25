import React, { useContext } from "react";
import { useFetchData } from "../hooks/useFetchData";
import {
  isSuccessResponse,
  Misdemeanour,
  MisdemeanourKind,
  YourId,
} from "../types/misdemeanours.types";

interface IMisdemeanoursContext {
  misdemeanours: Misdemeanour[] | undefined;
  addMisdemeanour: (misdemeanour: MisdemeanourKind) => void;
  misdemeanoursLoading: boolean;
  misdemeanourStatus: number | undefined;
  misdemeanourError: string;
}

const defaultFunction = () => {
  //empty function
};

export const MisdemeanoursContext = React.createContext<IMisdemeanoursContext>({
  misdemeanours: [],
  addMisdemeanour: defaultFunction,
  misdemeanoursLoading: true,
  misdemeanourStatus: undefined,
  misdemeanourError: "",
});

export const useMisdemeanours = () => {
  const { misdemeanours } = useContext(MisdemeanoursContext);
  return misdemeanours;
};

export const useAddMisdemeanour = () => {
  const { addMisdemeanour } = useContext(MisdemeanoursContext);
  return addMisdemeanour;
};

export const useMisdemeanoursLoading = () => {
  const { misdemeanoursLoading } = useContext(MisdemeanoursContext);
  return misdemeanoursLoading;
};

export const useMisdemeanoursError = () => {
  const { misdemeanourStatus, misdemeanourError } =
    useContext(MisdemeanoursContext);
  return { misdemeanourStatus, misdemeanourError };
};

export const MisdemeanoursProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { data, status, error, isFetching } = useFetchData(
    `http://localhost:8080/api/misdemeanours/20`
  );

  const misdemeanours: Misdemeanour[] | undefined = isSuccessResponse(data)
    ? data.misdemeanours
    : undefined;

  const addMisdemeanour = (misdemeanour: MisdemeanourKind) => {
    const newMisdemeanour = {
      citizenId: "YOU!" as YourId,
      misdemeanour: misdemeanour,
      date: new Date().toLocaleDateString(),
    };
    if (misdemeanours) {
      misdemeanours.push(newMisdemeanour);
    }
  };

  return (
    <MisdemeanoursContext.Provider
      value={{
        misdemeanours,
        addMisdemeanour,
        misdemeanoursLoading: isFetching,
        misdemeanourStatus: status,
        misdemeanourError: error,
      }}
    >
      {children}
    </MisdemeanoursContext.Provider>
  );
};
