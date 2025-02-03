const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  description = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-md font-medium mb-1">
          {label}
        </label>
      )}

      {description ? (
        <textarea
          id={id}
          name={id}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-15 resize-none focus:ring-primary focus:border-primary"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          {...rest}
        />
      )}
    </div>
  );
};

export default InputField;
