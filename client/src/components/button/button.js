import React from "react";
import "./button.css";

const STYLES = ["btn-line", "btn-normal","btn-border"];

const Button = ({ children, onClick, buttonStyle }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

    return (
    <>
        <button
            className={`${checkButtonStyle}`}
            onClick={onClick}
        >
        {children}
        </button>
    </>
    );
};

export default Button;