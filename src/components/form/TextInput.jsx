import React from "react";
import { Form } from "react-bootstrap";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  icon = null, // 🔥 NEW
}) => {
  return (
    <Form.Group className="mb-3 main-text-input">
      <Form.Label className="input-label">
        {icon && <span className="label-icon">{icon}</span>}
        {label}
        {required && <span className="required-star">*</span>}
      </Form.Label>

      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-control"
      />
    </Form.Group>
  );
};

export default TextInput;
