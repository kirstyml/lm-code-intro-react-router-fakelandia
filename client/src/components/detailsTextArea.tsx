import { ConfessionChangeHandler } from "../types/confession.types";

interface IDetailsTextArea {
  detailsText: string;
  handleChange: ConfessionChangeHandler;
  error: undefined | string;
  touched: boolean;
}

export const DetailsTextArea: React.FC<IDetailsTextArea> = ({
  detailsText,
  handleChange,
  error,
  touched,
}: IDetailsTextArea) => {
  return (
    <div className="confession-form__question">
      <textarea
        name="details"
        id="details"
        cols={30}
        rows={10}
        onChange={(event) => handleChange(event.target.value, "details")}
        value={detailsText}
        className={`confession-form__field${
          touched && error ? "--error" : "--valid"
        }`}
      ></textarea>
      {error && touched && (
        <p className="confession-form__error">Error: Details {error}</p>
      )}
    </div>
  );
};
