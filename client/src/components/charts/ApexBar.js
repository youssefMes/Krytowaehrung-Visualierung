import React, {useEffect, useState} from 'react'
import ReactApexCharts from 'react-apexcharts'

function ApexBar(props) {
    const [series, setSeries] = useState([{
        name: 'price',
        data: []
    }]);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            width: 2
        },


        grid: {
            row: {
                colors: ['#fff', '#f2f2f2']
            }
        },
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: [],
        },
        yaxis: {
            title: {
                text: 'Coins',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "horizontal",
            },
        }
    });
    useEffect(() => {
        if (props.prices.length > 0 && props.names.length > 0) {
            setSeries([
                {
                    name: 'price',
                    data: props.prices
                }
            ])
            setOptions({
                ...options,
                xaxis: {
                    ...options.xaxis,
                    categories: props.names
                }
            })
        }
    }, [props.prices])

    return (
        <div id="chart" style={{width: '60%', margin: "auto"}}>
            <ReactApexCharts options={options} series={series} type="bar" height={350}/>
        </div>


    );
}

    export default ApexBar
