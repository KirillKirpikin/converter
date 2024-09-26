import { useState } from "react";
import Header from "./Header";

import Converter from "./components/Converter";
import { IData } from "./type/data.type";

function App() {
    const [data, setData] = useState<IData | null>(null);

    return (
        <div>
            <Header data={data} />
            <Converter setData={setData} />
        </div>
    );
}

export default App;
