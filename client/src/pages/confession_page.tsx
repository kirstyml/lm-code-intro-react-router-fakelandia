import { ReasonsSelect } from "../components/reasonsSelect";
import { SubjectInput } from "../components/subjectInput";
import { DetailsTextArea } from "../components/detailsTextArea";
import { useFormInput } from "../hooks/useFormData";

export const Confession: React.FC = () => {
  const {
    formData,
    handleChange: onChangeHandler,
    errors,
    touched: inputTouched,
    handleSubmit,
    submitError,
    allValid,
  } = useFormInput();

  return (
    <div>
      <h2>Confess!</h2>
      <p>
        It&apos;s very difficult to catch people committing misdemeanours so we
        appreciate it when citizens confess to us directly.
      </p>
      <p>
        However, if you&apos;re just having a hard day and need to vent then
        you&apos;re welcome to contact us here too. Up to you!
      </p>
      <form onSubmit={handleSubmit} className="confession-form">
        <SubjectInput
          inputValue={formData.subject}
          handleChange={onChangeHandler}
          error={errors.subject}
          touched={inputTouched.subject}
        />
        <ReasonsSelect
          selectedReason={formData.reason}
          handleChange={onChangeHandler}
          error={errors.reason}
          touched={inputTouched.reason}
        />
        <DetailsTextArea
          detailsText={formData.details}
          handleChange={onChangeHandler}
          error={errors.details}
          touched={inputTouched.details}
        />
        <input
          type="submit"
          value="Confess"
          disabled={!allValid}
          className="confession-form__submit"
        />
        {submitError && (
          <p className="confession-form__error">
            Error: The confession has not been submitted. Details: {submitError}{" "}
          </p>
        )}
      </form>
    </div>
  );
};
