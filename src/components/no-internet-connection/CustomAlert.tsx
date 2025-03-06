import React, { useEffect, useState } from "react";

const CustomAlert = ({ message, type } : any) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // Auto close after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md transition-transform transform ${
                visible ? "translate-y-0" : "-translate-y-full"
            } ${
                type === "online"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
            }`}
        >
            <div className="flex items-center">
                {type === "online" ? (
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                )}
                <span>{message}</span>
            </div>
        </div>
    );
};

export default CustomAlert;
