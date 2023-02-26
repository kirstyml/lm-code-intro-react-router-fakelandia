import { useState } from "react";

export function useFilter() {
  const [filter, setFilter] = useState("");

  const onChangeHandler = (value: string) => {
    setFilter(value);
  };

  const filterValues = {
    filter,
    onChangeHandler,
  };

  return filterValues;
}
