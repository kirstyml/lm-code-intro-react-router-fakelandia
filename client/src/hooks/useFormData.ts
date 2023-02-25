import { useState } from "react";
import { useAddMisdemeanour } from "../context/misdemeanour_provider";
import {
  ConfessionChangeHandler,
  ConfessionData,
  ConfessionResponse,
  InputTouched,
} from "../types/confession.types";
import {
  detailsValidation,
  reasonValidation,
  subjectValidation,
} from "../validation/confession_validation";

const defaultConfessionData: ConfessionData = {
  subject: "",
  reason: "",
  details: "",
};

const defaultInputTouched: InputTouched = {
  subject: false,
  reason: false,
  details: false,
};

export function useFormInput() {
  const [formData, setFormData] = useState<ConfessionData>(
    defaultConfessionData
  );
  const [inputTouched, setInputTouched] = useState(defaultInputTouched);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const onChangeHandler: ConfessionChangeHandler = (value, name) => {
    const newInputTouched = { ...inputTouched };
    newInputTouched[name] = true;
    setInputTouched(newInputTouched);
    const newData = { ...formData };
    newData[name] = value;
    setFormData(newData);
  };

  const errors = {
    subject: subjectValidation(formData.subject),
    reason: reasonValidation(formData.reason),
    details: detailsValidation(formData.details),
  };

  const allValid = !errors.subject && !errors.reason && !errors.details;

  const updateMisdemeanours = useAddMisdemeanour();

  const resetForm = () => {
    setFormData(defaultConfessionData);
    setInputTouched(defaultInputTouched);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (allValid) {
      const body = JSON.stringify(formData);
      try {
        const response = await fetch(`http://localhost:8080/api/confess`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        });
        const responseJSON = (await response.json()) as ConfessionResponse;
        if (responseJSON.success) {
          if (
            !responseJSON.justTalked &&
            formData.reason !== "just-talk" &&
            formData.reason !== ""
          ) {
            updateMisdemeanours(formData.reason);
            alert("Your confession has been received.");
            resetForm();
          } else {
            alert("Thanks for chatting - hope you feel better!");
            resetForm();
          }
        } else {
          setSubmitError(responseJSON.message);
        }
      } catch (error) {
        if (typeof error === "string") {
          setSubmitError(error);
        } else if (error instanceof Error) {
          setSubmitError(error.message);
        }
      }
    }
  };

  const formValues = {
    formData,
    handleChange: onChangeHandler,
    errors,
    touched: inputTouched,
    handleSubmit,
    submitError,
    allValid,
  };

  return formValues;
}
