import React, { useState, useEffect, useContext } from "react";
import { Punishment } from "../types/punishment.types";

export const PunishmentsContext = React.createContext<{
  punishments: Punishment[];
}>({
  punishments: [],
});

export const usePunishments = () => {
  const { punishments } = useContext(PunishmentsContext);
  return punishments;
};

// TODO: decide how amount is specified
const amount = 10;

export const PunishmentsProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [punishments, setPunishments] = useState<Punishment[]>([]);
  useEffect(() => {
    getPunishments(amount);
  }, []);

  const getPunishments = async (amount: number) => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=1&limit=${amount}`
      );
      if (response.status === 200 || response.status === 201) {
        const responseJSON = await response.json();
        setPunishments(responseJSON);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PunishmentsContext.Provider
      value={{
        punishments,
      }}
    >
      {children}
    </PunishmentsContext.Provider>
  );
};
