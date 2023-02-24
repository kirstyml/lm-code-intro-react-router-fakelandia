import React, { useState, useEffect, useContext } from "react";
import {
  Misdemeanour,
  MisdemeanourKind,
  YourId,
} from "../types/misdemeanours.types";

interface IMisdemeanoursContext {
  misdemeanours: Misdemeanour[] | undefined;
  addMisdemeanour: (misdemeanour: MisdemeanourKind) => void;
  misdemeanoursLoading: boolean;
}

const defaultFunction = () => {
  //empty function
};

export const MisdemeanoursContext = React.createContext<IMisdemeanoursContext>({
  misdemeanours: [],
  addMisdemeanour: defaultFunction,
  misdemeanoursLoading: true,
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

export const MisdemeanoursProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [misdemeanours, setMisdemeanours] = useState<
    Misdemeanour[] | undefined
  >([]);
  const [misdemeanoursLoading, setMisdemeanoursLoading] =
    useState<boolean>(true);

  // amount of misdemeanours random max 100 set when app loads
  const amount = Math.floor(Math.random() * 100);

  useEffect(() => {
    getMisdemeanours(amount);
  }, []);

  const getMisdemeanours = async (amount: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/misdemeanours/${amount}`
      );
      if (response.status === 200 || response.status === 201) {
        const responseJSON = await response.json();
        setMisdemeanours(responseJSON.misdemeanours);
        setMisdemeanoursLoading(false);
      } else {
        console.log(response);
        setMisdemeanours(undefined);
        setMisdemeanoursLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMisdemeanours(undefined);
      setMisdemeanoursLoading(false);
    }
  };

  const addMisdemeanour = (misdemeanour: MisdemeanourKind) => {
    const newMisdemeanour = {
      citizenId: "YOU!" as YourId,
      misdemeanour: misdemeanour,
      date: new Date().toLocaleDateString(),
    };
    console.log(newMisdemeanour);
    misdemeanours && setMisdemeanours([...misdemeanours, newMisdemeanour]);
  };

  return (
    <MisdemeanoursContext.Provider
      value={{
        misdemeanours,
        addMisdemeanour,
        misdemeanoursLoading,
      }}
    >
      {children}
    </MisdemeanoursContext.Provider>
  );
};
