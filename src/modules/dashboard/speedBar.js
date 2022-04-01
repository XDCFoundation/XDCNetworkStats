import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";

const Div = styled.div`
  width: 100%;
  max-width: 900px;
  height: 120px;

  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;

let data = [0];

function SpeedBar(props) {
   data = [
    { time: 1, value: Math.round(props.stats.blockTime[0] * 100) / 100 },
    { time: 2, value: Math.round(props.stats.blockTime[1] * 100) / 100},
    { time: 3, value: Math.round(props.stats.blockTime[2] * 100) / 100},
    { time: 4, value: Math.round(props.stats.blockTime[3] * 100) / 100},
    { time: 5, value: Math.round(props.stats.blockTime[4] * 100) / 100},
    { time: 6, value: Math.round(props.stats.blockTime[5] * 100) / 100},
    { time: 7, value: Math.round(props.stats.blockTime[6] * 100) / 100},
    { time: 8, value: Math.round(props.stats.blockTime[7] * 100) / 100},
    { time: 9, value: Math.round(props.stats.blockTime[8] * 100) / 100},
    { time: 10, value: Math.round(props.stats.blockTime[9] * 100) / 100},
    { time: 11, value: Math.round(props.stats.blockTime[10] * 100) / 100},
    { time: 12, value: Math.round(props.stats.blockTime[11] * 100) / 100},
    { time: 13, value: Math.round(props.stats.blockTime[12] * 100) / 100},
    { time: 14, value: Math.round(props.stats.blockTime[13] * 100) / 100},
    { time: 15, value: Math.round(props.stats.blockTime[14] * 100) / 100},
    { time: 16, value: Math.round(props.stats.blockTime[15] * 100) / 100},
    { time: 17, value: Math.round(props.stats.blockTime[16] * 100) / 100},
    { time: 18, value: Math.round(props.stats.blockTime[17] * 100) / 100},
    { time: 19, value: Math.round(props.stats.blockTime[18] * 100) / 100},
    { time: 20, value: Math.round(props.stats.blockTime[19] * 100) / 100},
    { time: 21, value: Math.round(props.stats.blockTime[20] * 100) / 100},
    { time: 22, value: Math.round(props.stats.blockTime[21] * 100) / 100},
    { time: 23, value: Math.round(props.stats.blockTime[22] * 100) / 100},
    { time: 24, value: Math.round(props.stats.blockTime[23] * 100) / 100},
    { time: 25, value: Math.round(props.stats.blockTime[24] * 100) / 100},
    { time: 26, value: Math.round(props.stats.blockTime[25] * 100) / 100},
    { time: 27, value: Math.round(props.stats.blockTime[26] * 100) / 100},
    { time: 28, value: Math.round(props.stats.blockTime[27] * 100) / 100},
    { time: 29, value: Math.round(props.stats.blockTime[28] * 100) / 100},
    { time: 30, value: Math.round(props.stats.blockTime[29] * 100) / 100},
    { time: 31, value: Math.round(props.stats.blockTime[30] * 100) / 100},
    { time: 32, value: Math.round(props.stats.blockTime[31] * 100) / 100},
    { time: 33, value: Math.round(props.stats.blockTime[32] * 100) / 100},
    { time: 34, value: Math.round(props.stats.blockTime[33] * 100) / 100},
    { time: 35, value: Math.round(props.stats.blockTime[34] * 100) / 100},
    { time: 36, value: Math.round(props.stats.blockTime[35] * 100) / 100},
    { time: 37, value: Math.round(props.stats.blockTime[36] * 100) / 100},
    { time: 38, value: Math.round(props.stats.blockTime[37] * 100) / 100},
    { time: 39, value: Math.round(props.stats.blockTime[38] * 100) / 100},
    { time: 40, value: Math.round(props.stats.blockTime[39] * 100) / 100},
  ];

  const theme = {
    grid: {
      line: {
        stroke: "#667FC1",
        strokeWidth: 1.5,
        strokeDasharray: "1",
      },
    },
    axis: {
      ticks: {
        text: {
          fill: "#667FC1",
        },
      },
    },
  };

  return (
    <Div>
      {
        !data[0].value ? (
            <div className="center-parent-div position-relative top-50px">
              <div className="dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
        ) : (
                <div></div>
            )
      }
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="time"
        colors={["#0093FF"]}
        enableLabel={false}
        enableGridY={true}
        theme={theme}
        gridYValues={["0","1","2", "3","4","5","6","7","8","9","10", "15", "20", "25", "30", "35", "40", "45","50","55"]}
        margin={{ bottom: 3, left: 10 }}
        axisLeft={{
          tickSize: 1,
          tickValues: ["0","1","2", "3","4","5","6","7","8","9","10", "15", "20", "25", "30", "35", "40", "45","50","55"],
          tickPadding: 0
        }}
        padding={0.5}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              color,
              background: "white",
              fontSize: "15px",
            }}
          >
            <strong>
              {id}: {value}
            </strong>
          </div>
        )}
      />
    </Div>
  );
}

const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(SpeedBar);