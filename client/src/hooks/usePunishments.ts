import { useState, useEffect } from "react";
import { Misdemeanour } from "../types/misdemeanours.types";
import { Punishment } from "../types/punishment.types";

export function usePunishments(misdemeanours : Misdemeanour[]) {
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

    return punishments;
}