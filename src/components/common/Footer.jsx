import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>
                Designed &amp; Developed by <strong>Gokul</strong>{" "}
                <FaHeart className="heart-icon" />
            </p>
        </footer>
    );
};

export default Footer;
