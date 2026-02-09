import React from "react";

const Button = ({
  label = "Button",
  onClick,
  type = "button",

  variant = "primary",    
  size = "md",             

  icon = null,             
  iconPosition = "left",   

  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        custom-btn
        custom-btn-${variant}
        custom-btn-${size}
        ${disabled ? "disabled" : ""}
      `}
    >
      {icon && iconPosition === "left" && (
        <span className="btn-icon">{icon}</span>
      )}

      <span className="btn-text">{label}</span>

      {icon && iconPosition === "right" && (
        <span className="btn-icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
