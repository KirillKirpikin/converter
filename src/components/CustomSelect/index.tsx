import React, { useState } from "react";
import styles from "./select.module.scss";
import ArrowPng from "../../assets/arrow.png";

interface ICustomSelect {
    currencyOptions: string[];
    selectCurrent: string;
    onChangeCurrent: React.Dispatch<React.SetStateAction<string>>;
}

const CustomSelect: React.FC<ICustomSelect> = ({
    currencyOptions,
    selectCurrent,
    onChangeCurrent,
}) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={styles.select}>
            <div className={styles.main} onClick={() => setIsActive(!isActive)}>
                <span>{selectCurrent}</span>
                <img
                    src={ArrowPng}
                    alt="arrow"
                    className={`${styles.img} ${isActive && styles.img_active}`}
                />
            </div>

            {isActive && (
                <div className={styles.options}>
                    {currencyOptions &&
                        currencyOptions.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    onChangeCurrent(option);
                                    setIsActive(!isActive);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
