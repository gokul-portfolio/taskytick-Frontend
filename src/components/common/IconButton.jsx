import React from "react";

const IconButton = ({
  icon,
  onClick,
  type = "button",
  variant = "default",   // default | primary | danger
  size = "md",           // sm | md | lg
  title = "",            // tooltip
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`
        icon-btn
        icon-btn-${variant}
        icon-btn-${size}
        ${disabled ? "disabled" : ""}
      `}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
