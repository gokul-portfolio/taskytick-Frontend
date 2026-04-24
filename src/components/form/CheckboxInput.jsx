import React from "react";
import { Form } from "react-bootstrap";

const CheckboxInput = ({
  label,
  name,
  checked,
  onChange,
  icon = null,      // 🔥 icon support
}) => {
  return (
    <Form.Group className="mb-3 main-checkbox-input">
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />

        <span className="checkbox-custom"></span>

        <span className="checkbox-label">
          {icon && <span className="label-icon">{icon}</span>}
          {label}
        </span>
      </label>
    </Form.Group>
  );
};

export default CheckboxInput;
