import React from "react";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = ({ name, onChange, value, title, className }) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="select-none text-sm mb-1">
        {title}
      </label>
      <textarea
        name={name}
        id={name}
        className={`form-textarea ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
