import React from "react";
import { Form } from "react-bootstrap";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder,
  required = false,
  icon = null, // 🔥 icon support
}) => {
  return (
    <Form.Group className="mb-3 main-text-area">
      <Form.Label className="input-label">
        {icon && <span className="label-icon">{icon}</span>}
        {label}
        {required && <span className="required-star">*</span>}
      </Form.Label>

      <Form.Control
        as="textarea"
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="textarea-control"
      />
    </Form.Group>
  );
};

export default TextArea;
