import React, {useState} from 'react'
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";


function ApexTreeMap(props) {
    const [data, setData] = useState({
        name: 'Cryptocurrencies',
        children: props.data
    });
    console.log('data props', data)
    return (
        <div id="chart" style={{width: '60%', margin: "auto"}}>
            {data.children.length > 0 && <TreeMap
                id="myTreeMap"
                width={700}
                height={400}
                data={{
                    name: 'Cryptocurrencies',
                    children: props.data
                }}
                valueUnit={"$"}
            />}
        </div>


    );
}

export default ApexTreeMap
