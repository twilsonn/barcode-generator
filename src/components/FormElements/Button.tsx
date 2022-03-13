import React from "react";

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    buttonType: "primary" | "secondary";
    buttonInputType?: "submit" | "reset" | "button" | undefined;
  }
> = ({
  name,
  onClick,
  value,
  title,
  buttonType,
  className,
  buttonInputType,
}) => {
  switch (buttonType) {
    case "primary":
      return (
        <button
          id={name}
          name={name}
          type={buttonInputType}
          className={`bg-black text-white px-3 py-4 text-center border border-black ${className}`}
        >
          {title}
        </button>
      );
    case "secondary":
      return (
        <button
          id={name}
          name={name}
          type={buttonInputType}
          className={`bg-white text-black px-3 py-4 text-center border border-black ${className}`}
          onClick={onClick}
        >
          {title}
        </button>
      );
    default:
      return null;
  }
};

export default Button;
