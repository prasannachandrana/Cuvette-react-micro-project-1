import React, { useState } from "react";
import bgMobile from "./images/bg-main-mobile.png";
import bgDesktop from "./images/bg-main-desktop.png";
import logo from "./images/card-logo.svg";
import tick from "./images/icon-complete.svg";
import { format } from "date-fns";

export default function App() {
    const [confirmed, setConfirmed] = useState(false);
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [date, setDate] = useState("01/23");
    const [cvc, setCvc] = useState("");
    const [nameError, setNameError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [dateError, setDateError] = useState("");
    const [pinError, setPinError] = useState("");

    // Validation functions
    const validateName = () => {
        if (!name) {
            setNameError("Name can't be blank.");
            return false;
        } else if (!isAlphabet(name)) {
            setNameError("Wrong format.");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateCardNumber = () => {
        if (!cardNumber) {
            setCardNumberError("Card number can't be blank.");
            return false;
        } else if (!isNumber(cardNumber)) {
            setCardNumberError("Wrong format, numbers only.");
            return false;
        }
        setCardNumberError("");
        return true;
    };

    const validateDate = () => {
        if (!date) {
            setDateError("Date can't be blank.");
            return false;
        } else if (!isValidDate(date)) {
            setDateError("Invalid date.");
            return false;
        }
        setDateError("");
        return true;
    };

    const validatePin = () => {
        if (!cvc) {
            setPinError("CVC can't be blank.");
            return false;
        } else if (!isNumber(cvc)) {
            setPinError("Wrong format, numbers only.");
            return false;
        }
        setPinError("");
        return true;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const validName = validateName();
        const validCardNumber = validateCardNumber();
        const validDate = validateDate();
        const validPin = validatePin();

        if (validName && validCardNumber && validDate && validPin) {
            // Handle successful form submission
            setConfirmed(true);
        }
    };

    // Helper functions for validation
    const isAlphabet = (str) => {
        let char = str.split("");

        if (
            char.some(
                (c) =>
                    c.charCodeAt() < 65 &&
                    c.charCodeAt() !== 32 &&
                    c.charCodeAt() !== 39 &&
                    c.charCodeAt() !== 47
            )
        ) {
            return false;
        } else if (
            char.some(
                (c) =>
                    c.charCodeAt() > 90 &&
                    c.charCodeAt() < 97 &&
                    c.charCodeAt() > 122
            )
        ) {
            return false;
        }
        return true;
    };

    const isNumber = (str) => {
        let char = str.split("");

        if (char.some((c) => c.charCodeAt() < 48 || c.charCodeAt() > 57))
            return false;
        return true;
    };

    const isValidDate = (dateStr) => {
        if (!/^\d{2}\/\d{2}$/.test(dateStr)) {
            return false; // Format should be MM/YY
        }

        const [month, year] = dateStr.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year
        const currentMonth = currentDate.getMonth() + 1; // Month is zero-based

        if (parseInt(year, 10) < currentYear) {
            return false; // Year is in the past
        } else if (
            parseInt(year, 10) === currentYear &&
            parseInt(month, 10) < currentMonth
        ) {
            return false; // Year is current, but month is in the past
        }

        return true;
    };

    // Format a number with spaces every 4 digits
    // const formatNumber = (str, len) => {
    //     str = str + "0".repeat(len - str.length);
    //     let arr = [];
    //     for (let i = 0; i <= str.length; i += 4) {
    //         arr.push(str.slice(i, i + 4));
    //     }
    //     return arr.join(" ");
    // };

    return (
        <>
            <section>
                <div className="absolute -z-10 w-full">
                    <picture>
                        <source media="(min-width: 768px)" srcSet={bgDesktop} />
                        <img
                            src={bgMobile}
                            alt=""
                            className="w-full md:w-1/3"
                        />
                    </picture>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
                    <div className="mt-10 mx-5 grid grid-cols-1">
                        <article className="front-card p-5 flex flex-col justify-between">
                            <img src={logo} alt="" className="w-20 lg:w-28" />

                            <div>
                                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                                    {cardNumber}
                                </h2>

                                <ul className="flex items-center justify-between">
                                    <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                                        {name}
                                    </li>
                                    <li className="text-white text-base lg:text-xl tracking-widest">
                                        {format(new Date(date), "MM/yy")}
                                    </li>
                                </ul>
                            </div>
                        </article>

                        <article className="back-card relative lg:ml-20">
                            <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                                {cvc}
                            </p>
                        </article>
                    </div>

                    <div className="pt-8 px-5 pb-20">
                        {!confirmed && (
                            <form
                                className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label htmlFor="cardholder_name">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardholder_name"
                                        id="name"
                                        placeholder="e.g. Jane Appleseed"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    {nameError && (
                                        <p className="error-message">
                                            {nameError}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="card_number">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="card_number"
                                        id="number"
                                        placeholder="e.g. 1234 5678 9012 3456"
                                        required
                                        maxLength={19}
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(e.target.value)
                                        }
                                    />
                                    {cardNumberError && (
                                        <p className="error-message">
                                            {cardNumberError}
                                        </p>
                                    )}
                                </div>

                                <article className="flex items-center justify-between gap-8">
                                    <div className="flex-1">
                                        <label htmlFor="expiry_date">
                                            Exp. Date (MM/YY)
                                        </label>
                                        <input
                                            type="text"
                                            name="expiry_date"
                                            id="date"
                                            placeholder="MM/YY"
                                            required
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                        {dateError && (
                                            <p className="error-message">
                                                {dateError}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="cvc">CVC</label>
                                        <input
                                            type="number"
                                            name="cvc"
                                            id="pin"
                                            placeholder="e.g. 123"
                                            maxLength={3}
                                            required
                                            value={cvc}
                                            onChange={(e) =>
                                                setCvc(e.target.value)
                                            }
                                        />
                                        {pinError && (
                                            <p className="error-message">
                                                {pinError}
                                            </p>
                                        )}
                                    </div>
                                </article>

                                <button type="submit" className="btn">
                                    Confirm
                                </button>
                            </form>
                        )}

                        {confirmed && <ThankYou setConfirmed={setConfirmed} />}
                    </div>
                </div>
            </section>
        </>
    );
}

function ThankYou({ setConfirmed }) {
    return (
        <>
            <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto">
                <img src={tick} alt="" className="block mx-auto" />
                <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
                    Thank you!
                </h1>
                <p className="text-slate-400 text-center">
                    We've added your card details
                </p>
                <button
                    onClick={() => setConfirmed(false)}
                    className="btn block mx-auto mt-10 w-full"
                >
                    Continue
                </button>
            </div>
        </>
    );
}
