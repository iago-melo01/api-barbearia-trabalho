import './FormInput.css';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
  select?: boolean;
  options?: { value: string | number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  textarea = false,
  select = false,
  options = [],
  min,
  max,
  step,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`form-control ${error ? 'error' : ''}`}
          rows={4}
        />
      ) : select ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`form-control ${error ? 'error' : ''}`}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`form-control ${error ? 'error' : ''}`}
          min={min}
          max={max}
          step={step}
        />
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

