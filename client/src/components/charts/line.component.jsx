import React, {useEffect, useRef, useState} from "react";
import * as d3 from 'd3'
import {select, selectAll} from 'd3-selection';
import {transition} from 'd3-transition';
import "../../style/line.style.css";
import axios from "axios";
import {line, curveMonotoneX} from 'd3-shape';
import {extent} from 'd3-array';
import {scaleLinear, scaleBand, scaleOrdinal} from 'd3-scale';
import ApexLine from "./ApexLine";

const Line = (props) => {
    const [prices, setPrices] = useState([]);
    const [dates, setDates] = useState([]);
    const [timeFilter, setTimeFilter] = useState('1');
    const [id, setId] = useState('bitcoin');

    const getData = async () => {
        const res = await axios.get(`http://localhost:9000/api/asset/price/line`, {
            params:{
                id: id,
                timeFilter: timeFilter
            }
        })
        const prices = res.data.map(item => item.price)
        const dates = res.data.map(item => item.date)
        setPrices(prices)
        setDates(dates)
    }
    useEffect(() => {
        getData()
    }, [])



    return  (
        <ApexLine prices={prices} dates={dates}/>
    )


};
export default Line
