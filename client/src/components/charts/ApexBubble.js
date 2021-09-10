import React, {useEffect, useState} from 'react'
import ReactApexCharts from 'react-apexcharts'

// class ApexBubble extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//
//             series: [{
//                 name: 'Bubble1',
//                 data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//                     min: 10,
//                     max: 60
//                 })
//             },
//                 {
//                     name: 'Bubble2',
//                     data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//                         min: 10,
//                         max: 60
//                     })
//                 },
//                 {
//                     name: 'Bubble3',
//                     data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//                         min: 10,
//                         max: 60
//                     })
//                 },
//                 {
//                     name: 'Bubble4',
//                     data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//                         min: 10,
//                         max: 60
//                     })
//                 }],
//             options: {
//                 chart: {
//                     height: 350,
//                     type: 'bubble',
//                 },
//                 dataLabels: {
//                     enabled: false
//                 },
//                 fill: {
//                     opacity: 0.8
//                 },
//                 title: {
//                     text: 'Simple Bubble Chart'
//                 },
//                 xaxis: {
//                     tickAmount: 12,
//                     type: 'category',
//                 },
//                 yaxis: {
//                     max: 70
//                 }
//             },
//
//
//         };
//     }
//
//
//
//     render() {
//         return (
//
//
//             <div id="chart">
//                 <ReactApexCharts options={this.state.options} series={this.state.series} type="bubble" height={350} />
//             </div>
//
//
//         );
//     }
// }

function ApexBubble(props) {
    const [series, setSeries] = useState([
        {
            name: 'Bubble3',
            data: [20, 10]
        },
       ]);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
                type: 'bubble',
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 0.8
        },
        title: {
            text: 'Simple Bubble Chart'
        },
        xaxis: {
            tickAmount: 12,
                type: 'category',
        },
        yaxis: {
            max: 70
        }
    });

    useEffect(() => {
        // if (props.data.length > 0){
        //     console.log('bubble data', props.data)
        //     const newData = props.data.map(coin => {
        //         return {
        //             name: coin.name,
        //             data: [parseFloat(coin.price_usd)]
        //         }
        //     })
        //     console.log('bubble new data', newData)
        //
        //     setSeries(newData)
        // }

    }, [])
    return (
        <div id="chart" style={{width: '60%', margin: "auto"}}>
            <ReactApexCharts options={options} series={series} type="bar" height={350}/>
        </div>


    );
}

export default ApexBubble
