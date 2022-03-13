import React, { Children } from "react";

const Select: React.FC<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
> = ({ name, onChange, value, title, children }) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="select-none text-sm mb-1">
        {title}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
