import React from "react";

import styles from "./converter-item.module.scss";
import CustomSelect from "../CustomSelect";

interface IConverterItem {
    currencyOptions: string[];
    selectCurrent: string;
    bg: string;
    amount: string;
    onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCurrent: React.Dispatch<React.SetStateAction<string>>;
}

const ConverterItem: React.FC<IConverterItem> = ({
    currencyOptions,
    selectCurrent,
    amount,
    onChangeAmount,
    onChangeCurrent,
    bg,
}) => {
    return (
        <div className={`py-[50px] ${bg}`}>
            <div className={styles.items}>
                <div className={styles.select}>
                    <CustomSelect
                        currencyOptions={currencyOptions}
                        onChangeCurrent={onChangeCurrent}
                        selectCurrent={selectCurrent}
                    />
                </div>
                <div className={styles.input}>
                    <input
                        type="number"
                        value={amount}
                        onChange={onChangeAmount}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConverterItem;
