import React, { useEffect, useState } from "react";
import ConverterItem from "../ConverterItem";
import { IData, IDataPair } from "../../type/data.type";
import RefreshSvg from "../../assets/refresh.svg";
import styles from "./converter.module.scss";

const Converter = ({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<IData | null>>;
}) => {
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [fromCurrent, setFromCurrent] = useState<string>("");
    const [toCurrent, setToCurrent] = useState<string>("");
    const [exchangeRate, setExchangeRate] = useState<number>();
    const [amount, setAmount] = useState<number>(1);
    const [amountInFrom, setAmountInFrom] = useState<boolean>(true);

    let toAmount: number = 1;
    let fromAmount: number = 1;

    if (amountInFrom) {
        fromAmount = amount;
        if (exchangeRate) toAmount = +(amount * exchangeRate).toFixed(2);
    } else {
        toAmount = amount;
        if (exchangeRate) fromAmount = +(amount / exchangeRate).toFixed(2);
    }

    function handleFromAmount(e: React.ChangeEvent<HTMLInputElement>) {
        if (!isNaN(Number(e.target.value))) {
            setAmount(parseFloat(e.target.value));
            setAmountInFrom(true);
        } else {
            setAmount(0);
        }
    }
    function handleToAmount(e: React.ChangeEvent<HTMLInputElement>) {
        if (!isNaN(Number(e.target.value))) {
            setAmount(parseFloat(e.target.value));
            setAmountInFrom(false);
        } else {
            setAmount(0);
        }
    }

    function handleReverse() {
        const c = toCurrent;
        setToCurrent(fromCurrent);
        setFromCurrent(c);
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}latest/UAH`)
            .then((res) => res.json())
            .then((data: IData) => {
                setData(data);
                const firstCurrent = "USD";
                setCurrencyOptions([...Object.keys(data.conversion_rates)]);
                setFromCurrent(data.base_code);
                setToCurrent(firstCurrent);
                setExchangeRate(data.conversion_rates[firstCurrent]);
            });
    }, [setData]);

    useEffect(() => {
        if (fromCurrent && toCurrent)
            fetch(
                `${
                    import.meta.env.VITE_BASE_URL
                }pair/${fromCurrent}/${toCurrent}`
            )
                .then((res) => res.json())
                .then((data: IDataPair) => {
                    setExchangeRate(data.conversion_rate);
                });
    }, [toCurrent, fromCurrent]);

    return (
        <>
            <h1 className={styles.title}>Конвертер валют</h1>
            <div className={styles.converter}>
                <ConverterItem
                    currencyOptions={currencyOptions}
                    selectCurrent={fromCurrent}
                    onChangeAmount={handleFromAmount}
                    onChangeCurrent={setFromCurrent}
                    amount={fromAmount.toString()}
                    bg="bg-[#222222]"
                />
                <div className={styles.refresh}>
                    <button onClick={handleReverse}>
                        <img src={RefreshSvg} alt="refresh" />
                    </button>
                </div>
                <ConverterItem
                    currencyOptions={currencyOptions}
                    selectCurrent={toCurrent}
                    onChangeAmount={handleToAmount}
                    onChangeCurrent={setToCurrent}
                    amount={toAmount.toString()}
                    bg="bg-[#303030]"
                />
            </div>
        </>
    );
};

export default Converter;
