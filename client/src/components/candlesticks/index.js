import React, {useEffect, useState} from "react";
import axios from 'axios'

import "../../style/candlesticks.style.css";

import Chart from "./chart.component";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const pairs = [
    { name: 'BTC/USD', value: 'btcusd'},
    { name: 'XRP/USD', value: 'xrpusd'},
    { name: 'ETH/USD', value: 'ethusd'},
    { name: 'DOGE/USD', value: 'dogeusd'},
]
export default function CandleSticksChartChart() {
    const chart_width = 500;
    const chart_height = 300;
    const [data, setData] = useState([]);
    const [selectedPair, setSelectedPair] = useState(pairs[0].value);
    const getData = async () => {
        const res = await axios.get(`http://localhost:9000/api/asset/ohlc?pairSymbol=${selectedPair}`)
        // reduce candelsticks number to optimise view
        setData(res.data[900].slice(Math.max(res.data[900].length - 100, 1)));
    };

    useEffect(() => {
        getData()
    }, [selectedPair])

    return (
        <div className="cs">
            <FormControl style={{float: "left"}}>
                <InputLabel id="demo-simple-select-label">BTC/USD</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setSelectedPair(e.target.value)}
                    defaultValue={pairs[0].value}
                >
                    {pairs.map(pair => <MenuItem value={pair.value}>{pair.name}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="content">
                <div>
                    <Chart data={data} width={chart_width} height={chart_height} selectedPair={selectedPair}/>
                </div>
            </div>
        </div>
    );
}
