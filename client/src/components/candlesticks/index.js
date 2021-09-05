import React, {useEffect, useState} from "react";
import axios from 'axios'
import * as d3 from "d3";

import "../../style/candlesticks.style.css";

import Chart from "./chart.component";

export default function CandleSticksChartChart() {
    const chart_width = 500;
    const chart_height = 300;
    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await axios.get('http://localhost:9000/api/asset/ohlc?pairSymbol=xrpusd')
        // reduce candelsticks number to optimise view
        setData(res.data[900].slice(Math.max(res.data[900].length - 200, 1)));
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="cs">
            <div className="content">
                <div>
                    <Chart data={data} width={chart_width} height={chart_height} />
                </div>
            </div>
        </div>
    );
}
