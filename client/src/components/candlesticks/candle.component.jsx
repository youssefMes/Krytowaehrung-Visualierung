import React from "react";
import classNames from "classnames";

const Candle = props => {
    const { data, x, candle_width, pixelFor } = props;
    const up = data.closePrice > data.openPrice;
    const bar_top = pixelFor(up ? parseFloat(data.closePrice) : parseFloat(data.openPrice));
    const bar_bottom = pixelFor(up ? data.openPrice : data.closePrice);
    const bar_height = bar_bottom - bar_top;
    const wick_top = pixelFor(data.highPrice);
    const wick_bottom = pixelFor(data.lowPrice);

    return (
        <>
            <rect
                x={x - candle_width / 2}
                y={bar_top}
                width={candle_width}
                height={bar_height}
                className={classNames({
                    candle: true,
                    up: up,
                    down: !up
                })}
            />
            <line
                className={classNames({
                    wick: true,
                    top: true,
                    up: up,
                    down: !up
                })}
                x1={x}
                y1={bar_top}
                x2={x}
                y2={wick_top}
            />
            <line
                className={classNames({
                    wick: true,
                    bottom: true,
                    up: up,
                    down: !up
                })}
                x1={x}
                y1={bar_bottom}
                x2={x}
                y2={wick_bottom}
            />
        </>
    );
};

export default Candle;
