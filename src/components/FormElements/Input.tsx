import React from "react";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ name, onChange, value, title }) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="select-none text-sm mb-1">
        {title}
      </label>
      <input
        name={name}
        id={name}
        className="form-input"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
