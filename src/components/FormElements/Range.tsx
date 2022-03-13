import React from "react";

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ name, onChange, value, title, min, max }) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="select-none text-sm mb-1">
        {title}
      </label>
      <div className="flex space-x-4">
        <input
          type="range"
          id={name}
          className="form-range fill-black appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
        <div>{value}</div>
      </div>
    </div>
  );
};

export default Input;
