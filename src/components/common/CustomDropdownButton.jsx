import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdownButton = ({
    label,
    icon: Icon,     // 🔥 icon as prop
    options = [],
    onSelect,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="filter-wrapper dropdown-btn-wrapper">

            {/* BUTTON */}
            <button
                type="button"
                className="filter-dropdown dropdown-btn"
                onClick={() => setOpen(!open)}
            >
                <span className="dropdown-btn-label">
                    {Icon && <Icon className="dropdown-btn-icon" />}
                    {label}
                </span>

                <FaChevronDown className={`dropdown-arrow ${open ? "open" : ""}`} />
            </button>

            {/* DROPDOWN MENU */}
            {open && (
                <ul className="dropdown-menu-custom">
                    {options.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onSelect(item);
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdownButton;
