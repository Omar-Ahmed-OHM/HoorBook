import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    classname?: string;
    onclick?: () => void;
    disabeld?: boolean;
    type?: "button" | "submit" | "reset";
    theme?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    classname = "",
    onclick,
    disabeld = false,
    type = "button",
    theme = ""
}) => {
    // Compute the className based on the theme
    const computedClassname = theme === "primary" 
        ? "bg-btn-color rounded-[36px] text-white p-2 w-[135px] h-[46px]" 
        : "bg-card-color rounded-[36px] text-white p-2 w-[135px] h-[46px]";
    return (
        <button
            type={type}
            onClick={onclick}
            className={`${computedClassname} ${classname}`}
            disabled={disabeld}
        >
            {children}
        </button>
    );
};
