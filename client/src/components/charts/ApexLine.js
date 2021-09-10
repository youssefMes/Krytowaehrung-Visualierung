import React, {useEffect, useState} from 'react'
import ReactApexCharts from 'react-apexcharts'
import axios from "axios";
import '../../style/main.style.css'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


function ApexLine(props) {
    const [series, setSeries] = useState({});
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: [],

        }
    });
    const [id, setId] = useState('bitcoin');
    const [timeFilter, setTimeFilter] = useState('30');
    const coins = [
        { name: 'bitcoin'},
        { name: 'ethereum'},
        { name: 'dogecoin'},
        { name: 'ripple'},
    ]
    const  capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getData = async () => {
        const res = await axios.get(`http://localhost:9000/api/asset/price/line`, {
            params:{
                id: id,
                timeFilter: timeFilter
            }
        })
        const prices = res.data.map(item => item.price)
        const dates = res.data.map(item => item.date)
        setSeries(
            [
                {
                    name: capitalize(id) + ' price',
                    data: prices
                }
            ]
        )
        setOptions({
                ...options,
                xaxis: {
                    categories: dates
                }
            })

    }
    useEffect(() => {
        getData()
    }, [id])

    return (
        <div className={'chart_style'}>
            <FormControl style={{marginLeft: '300px', display: 'inline-block', width: '100px'}}>
                <InputLabel id="demo-simple-select-label">Select Coin</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                    defaultValue={coins[0].name}
                >
                    {coins.map(pair => <MenuItem value={pair.name}>{pair.name}</MenuItem>)}
                </Select>
            </FormControl>

            <div id="chart" style={{width:'60%', margin: "auto"}}>
                <ReactApexCharts options={options} series={series} type="line" height={350} />
            </div>
        </div>

    );
}

export default ApexLine
