import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

export default function BarChart(props) {
    console.log('props', props)
    const chartRef = useRef(null);

    useEffect(() => {
        if (props.data.length > 0) {
            const dataset = props.data.map(coin => parseFloat(coin.price_usd).toFixed(2))
            const w = 600;
            const h = 300;
            const svg = d3
                .select(chartRef.current)
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "bar");

            svg
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("fill", "grey")
                .attr("class", "sBar")
                .attr("x", (d, i) => i * 60)
                .attr("y", (d, i) => {
                    return h - 7 * d;
                })
                .attr("width", 50)
                .attr("height", (d, i) => 7 * d)
                .append("title")
                .text(d => d);
        }
    })

    const styles = {
        container: {
            display: "grid",
            justifyItems: "center"
        }
    };
    return (
        <div ref={chartRef} style={styles.container}>
            <h1 style={{ textAlign: "center" }}>Hi, I'm the bar chart :)</h1>
        </div>
    );
}
