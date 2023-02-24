import { ConfessionChangeHandler } from "../types/confession.types";
import { reasons, reasonOptions } from "../types/reasons.types";

interface IReasonsSelect {
  selectedReason: reasonOptions;
  handleChange: ConfessionChangeHandler;
  error: undefined | string;
  touched: boolean;
}

export const ReasonsSelect: React.FC<IReasonsSelect> = ({
  selectedReason,
  handleChange,
  error,
  touched,
}: IReasonsSelect) => {
  return (
    <div className="confession-form__question">
      <label htmlFor="reason" className="confession-form__label">
        Reason for contact
      </label>
      <select
        name="reason"
        id="reason"
        value={selectedReason}
        onChange={(e) =>
          handleChange(e.target.value as reasonOptions, "reason")
        }
        className={`confession-form__field${
          touched && error ? "--error" : "--valid"
        }`}
      >
        {reasons.map((reason) => (
          <option key={reason} value={reason}>
            {reason === ""
              ? "--Please select an option--"
              : reason === "just-talk"
              ? "I just want to talk"
              : reason}
          </option>
        ))}
      </select>
      {error && touched && (
        <p className="confession-form__error">Error: Reason {error}</p>
      )}
    </div>
  );
};
