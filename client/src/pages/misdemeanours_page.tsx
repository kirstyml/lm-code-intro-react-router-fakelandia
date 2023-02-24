import React, { useState, useEffect } from "react";
import { MisdemeanoursContainer } from "../components/misdemeanours_container";
import {
  useMisdemeanours,
  useMisdemeanoursLoading,
} from "../context/misdemeanour_provider";
import { Punishment } from "../types/punishment.types";

export const Misdemeanours: React.FC = () => {
  const misdemeanours = useMisdemeanours();
  const misdemeanoursLoading = useMisdemeanoursLoading();
  const [punishments, setPunishments] = useState<Punishment[]>([])

  useEffect(() => {
    if(misdemeanours) {
      getPunishments(misdemeanours.length);
    }
  }, [misdemeanours]);

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
