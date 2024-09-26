export interface IData {
    base_code: string;
    conversion_rates: IConversion;
}

interface IConversion {
    [key: string]: number;
}

export interface IDataPair {
    conversion_rate: number;
}
