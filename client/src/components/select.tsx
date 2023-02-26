interface ISelect {
  name: string;
  options: Array<string>;
  label: string;
  value: string;
  handleChange: (value: string) => void;
  error: undefined | string;
  touched: boolean;
}

export const Select: React.FC<ISelect> = ({
  name,
  options,
  label,
  value,
  handleChange,
  error,
  touched,
}: ISelect) => {
  return (
    <div className="confession-form__question">
      <label htmlFor={name} className="confession-form__label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`confession-form__field${
          touched && error ? "--error" : "--valid"
        }`}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option === "" ? "--Please select an option--" : option}
          </option>
        ))}
      </select>
      {error && touched && (
        <p className="confession-form__error">Error: Reason {error}</p>
      )}
    </div>
  );
};
