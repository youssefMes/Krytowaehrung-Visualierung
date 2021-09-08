import React, {useEffect, useRef, useState} from "react";
import * as d3 from 'd3'
import {select, selectAll} from 'd3-selection';
import {transition} from 'd3-transition';
import "../../style/line.style.css";
import axios from "axios";
import {line, curveMonotoneX} from 'd3-shape';
import {extent} from 'd3-array';
import {scaleLinear, scaleBand, scaleOrdinal} from 'd3-scale';

const Line = (props) => {
    const [data, setData] = useState([]);
    const [timeFilter, setTimeFilter] = useState('30');
    const [id, setId] = useState('bitcoin');
    const lineRef = useRef(null);

    const getData = async () => {
        const res = await axios.get(`http://localhost:9000/api/asset/price/line`, {
            params:{
                id: id,
                timeFilter: timeFilter
            }
        })
        setData(res.data)
    }
    useEffect(() => {
        getData()
        if (data.length > 0 && lineRef.current.lastChild.tagName !== 'svg') {
            const margin = {top: 20, right: 20, bottom: 50, left: 70},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            const parseTime = d3.timeParse("%d-%b-%y");
            const x = d3.scaleTime().range([0, width]);
            const y = d3.scaleLinear().range([height, 0]);
            const valueline = d3.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.price); });
            const svg = d3.select(".my_block_line").append("svg")

                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.price; })]);
            svg.append("path")
                .data(data)

                .attr("class", "line")
                .attr("d", valueline);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            svg.append("g")
                .call(d3.axisLeft(y));
        }

    }, [data])



    return  (
        <div className={'my_block_line'} ref={lineRef}>
            <text>Line Chart</text>
        </div>


    )


};
export default Line
