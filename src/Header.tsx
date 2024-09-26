import { IData } from "./type/data.type";

const Header = ({ data }: { data: IData | null }) => {
    return (
        <div className="flex justify-end mb-[20px]">
            {data && (
                <div className="text-[25px] font-[600]">
                    ${(1 / data.conversion_rates["USD"]).toFixed(2)} | €
                    {(1 / data.conversion_rates["EUR"]).toFixed(2)}
                </div>
            )}
        </div>
    );
};

export default Header;
