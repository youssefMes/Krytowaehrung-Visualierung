import React from 'react'
import ReactApexCharts from 'react-apexcharts'
class ApexBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'price',
                data: this.props.prices ?? []
            }],
            options: {
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
                    enabled: false
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
                    categories: this.props.names ?? [],
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
            },


        };
    }



    render() {
        return (
            <div id="chart" style={{width:'60%', margin: "auto"}}>
                <ReactApexCharts options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>


        );
    }
}


export default ApexBar
