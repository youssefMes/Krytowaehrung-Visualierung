import React from 'react';
import * as d3 from "d3";
import _ from "lodash";
import axios from 'axios'


// todo refactor to functional component
export default class BubbleChart extends React.Component {
    static defaultProps = {
        data: [],
        useLabels: false,
        width: 600,
        height: 400
    };

    constructor(props) {
        super(props);

        this.minValue = 1;
        this.maxValue = 100;
        this.mounted = false;

        this.state = {
            data: []
        };

        this.radiusScale = this.radiusScale.bind(this);
        this.simulatePositions = this.simulatePositions.bind(this);
        this.renderBubbles = this.renderBubbles.bind(this);
    }
    getData = async () => {
        const res = await axios.get('http://localhost:9000/api/asset/price')
        this.setState({data: res.data})
    }

    componentWillMount() {
        this.mounted = true;
        this.getData()
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.minValue =
                0.95 *
                d3.min(this.props.data, item => {
                    return item.price_usd;
                });

            this.maxValue =
                1.05 *
                d3.max(this.props.data, item => {
                    return item.price_usd;
                });

            this.simulatePositions(this.props.data);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    radiusScale = value => {
        const fx = d3
            .scaleSqrt()
            .range([1, 100])
            .domain([this.minValue, this.maxValue]);

        return fx(value);
    };

    simulatePositions = data => {
        this.simulation = d3
            .forceSimulation()
            .nodes(data)
            .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force(
                "collide",
                d3.forceCollide(d => {
                    return this.radiusScale(d.price_usd) + 2;
                })
            )
            .on("tick", () => {
                if (this.mounted) {
                    this.setState({ data });
                }
            });
    };

    renderBubbles = data => {
        const minValue =
            0.95 *
            d3.min(data, item => {
                return item.price_usd;
            });

        const maxValue =
            1.05 *
            d3.max(data, item => {
                return item.price_usd;
            });

        const color = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .interpolate(d3.interpolateHcl)
            .range(["grey"]);


        // render circle and text elements inside a group
        const texts = _.map(data, (item, index) => {
            const props = this.props;
            const fontSize = 10;
            const  numb = parseInt(item.price_usd.toString().substring(0, 2)) +15;

            return (
                <g
                    key={index}
                    transform={`translate(${props.width / 2 + numb
                    }, ${props.height / 2 + numb})`}
                >
                    <circle
                        r={this.radiusScale(numb)}
                        fill={color(numb)}
                        stroke={d3.rgb(color(item.price_usd)).brighter(2)}
                        strokeWidth="2"
                    />
                    <text
                        dy="0"
                        fill="#fff"
                        textAnchor="middle"
                        fontSize={`${fontSize}px`}
                        fontWeight="bold"
                    >
                        {item.name}
                    </text>
                    <text
                        dy="10"
                        fill="#fff"
                        textAnchor="middle"
                        fontSize={`${fontSize}px`}
                        fontWeight="bold"
                    >
                        {item.price_usd.toFixed(2) + ' $'}
                    </text>
                </g>
            );
        });

        return texts;
    };

    render() {
        if (this.state.data.length) {
            return (
                <svg width={this.props.width} height={this.props.height}>
                    {this.renderBubbles(this.state.data)}
                </svg>
            );
        }

        return <div>Loading</div>;
    }
}
