import React from "react";
import { Form } from "react-bootstrap";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  icon = null, // 🔥 icon support
}) => {
  return (
    <Form.Group className="mb-3 main-select-input">
      <Form.Label className="input-label">
        {icon && <span className="label-icon">{icon}</span>}
        {label}
        {required && <span className="required-star">*</span>}
      </Form.Label>

      <div className="select-wrapper">
        <Form.Select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="select-control"
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </div>
    </Form.Group>
  );
};

export default SelectInput;
