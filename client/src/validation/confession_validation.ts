import { DETAILS_MIN_LENGTH } from "./validation_constants";
import { isNotEmpty, minLength } from "./validation_rules";

export const subjectValidation = (value: string) => {
  return isNotEmpty(value);
};

export const reasonValidation = (value: string) => {
  return isNotEmpty(value);
};

export const detailsValidation = (value: string) => {
  return minLength(value, DETAILS_MIN_LENGTH);
};
