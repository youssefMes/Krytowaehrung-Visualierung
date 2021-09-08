import React from 'react'
import ReactApexCharts from 'react-apexcharts'
import axios from "axios";
import '../../style/main.style.css'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

class ApexLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "bitcoin",
            timeFilter: "30",
            series: [{
                name: "BTC Price",
                data: this.props.prices ? this.props.prices : []
            }],
            options: {
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
                // title: {
                //     text: 'Product Trends by Month',
                //     align: 'left'
                // },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.dates ? this.props.dates : [],

                }
            },


        };
    }
    async getData() {
        const res = await axios.get(`http://localhost:9000/api/asset/price/line`, {
            params:{
                id: this.state.id,
                timeFilter: this.state.timeFilter
            }
        })
        const prices = res.data.map(item => item.price)
        const dates = res.data.map(item => item.date)
        this.setState({
            series: [
                {
                    ...this.state.series[0],
                    data: prices
                }
            ]
            })
        this.setState({
            options: {
                ...this.state.options,
                xaxis: {
                    categories: dates
                }
            }})

    }
    componentWillMount() {
        this.getData()
    }

    render() {
        const coins = [
            { name: 'bitcoin'},
            { name: 'ethereum'},
            { name: 'dogecoin'},
            { name: 'ripple'},
            { name: 'polygon'},
        ]
        return (
            <>
                <FormControl style={{float: "left", margin: "5px"}}>
                    <InputLabel id="demo-simple-select-label">Select Coin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(e) => this.setState({id: e.target.value})}
                        defaultValue={coins[0].name}
                    >
                        {coins.map(pair => <MenuItem value={pair.name}>{pair.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div id="chart" style={{width:'60%', margin: "auto"}}>
                    <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height={350} />
                </div>
            </>

        );
    }
}
export default ApexLine
