import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import _ from "lodash";

const Div = styled.div`
  width: 100%;
  max-width: 560px;
  height: 140px;
  display: ${(props) => (props.data ===30 ? "block" : "none")};
  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;


const Div1 = styled.div`
  width: 100%;
  max-width: 560px;
  height: 140px;
  display: ${(props) => (props.data === 24 ? "block" : "none")};
  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;


const Div2 = styled.div`
  width: 100%;
  max-width: 560px;
  height: 140px;
  display: ${(props) => (props.data === 7 ? "block" : "none")};
  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;


const theme = {
  axis: {
    ticks: {
      text: {
        fill: "#667FC1",
      },
    },
    legend: {
      text: {
        fill: "#667FC1"
      }
    }
  },
  grid: {
    line: {
      stroke: "#667FC1",
      strokeWidth: 1,
    },
  },
};

let data = [];
function EfficiencyBar(props) {
  if (!_.isEmpty(props.data) && !_.isUndefined(props.data)) {
    if (props.data.responseData.length === 7) {
      data = [
        { time: 1, Up: Math.round(props.data.responseData[0].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[0].uptime * 100) / 100 },
        { time: 2, Up: Math.round(props.data.responseData[1].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[1].uptime * 100) / 100 },
        { time: 3, Up: Math.round(props.data.responseData[2].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[2].uptime * 100) / 100},
        { time: 4, Up: Math.round(props.data.responseData[3].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[3].uptime * 100) / 100},
        { time: 5, Up: Math.round(props.data.responseData[4].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[4].uptime * 100) / 100 },
        { time: 6, Up: Math.round(props.data.responseData[5].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[5].uptime * 100) / 100 },
        { time: 7, Up: Math.round(props.data.responseData[6].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[6].uptime * 100) / 100 },
      ];
    }
  

    if (props.data.responseData.length === 24) {
      data = [
        { time: 1, Up: Math.round(props.data.responseData[0].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[0].upTime * 100) / 100 },
        { time: 2, Up: Math.round(props.data.responseData[1].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[1].upTime * 100) / 100 },
        { time: 3, Up: Math.round(props.data.responseData[2].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[2].upTime * 100) / 100 },
        { time: 4, Up: Math.round(props.data.responseData[3].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[3].upTime * 100) / 100 },
        { time: 5, Up: Math.round(props.data.responseData[4].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[4].upTime * 100) / 100},
        { time: 6, Up: Math.round(props.data.responseData[5].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[5].upTime * 100) / 100 },
        { time: 7, Up: Math.round(props.data.responseData[6].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[6].upTime * 100) / 100 },
        { time: 8, Up: Math.round(props.data.responseData[7].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[7].upTime * 100) / 100 },
        { time: 9, Up: Math.round(props.data.responseData[8].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[8].upTime * 100) / 100 },
        { time: 10, Up: Math.round(props.data.responseData[9].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[9].upTime * 100) / 100 },
        { time: 11, Up: Math.round(props.data.responseData[10].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[10].upTime * 100) / 100 },
        { time: 12, Up: Math.round(props.data.responseData[11].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[11].upTime * 100) / 100 },
        { time: 13, Up: Math.round(props.data.responseData[12].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[12].upTime * 100) / 100 },
        { time: 14, Up: Math.round(props.data.responseData[13].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[13].upTime * 100) / 100 },
        { time: 15, Up: Math.round(props.data.responseData[14].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[14].upTime * 100) / 100 },
        { time: 16, Up: Math.round(props.data.responseData[15].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[15].upTime * 100) / 100 },
        { time: 17, Up: Math.round(props.data.responseData[16].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[16].upTime * 100) / 100 },
        { time: 18, Up: Math.round(props.data.responseData[17].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[17].upTime * 100) / 100 },
        { time: 19, Up: Math.round(props.data.responseData[18].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[18].upTime * 100) / 100 },
        { time: 20, Up: Math.round(props.data.responseData[19].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[19].upTime * 100) / 100 },
        { time: 21, Up: Math.round(props.data.responseData[20].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[20].upTime * 100) / 100 },
        { time: 22, Up: Math.round(props.data.responseData[21].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[21].upTime * 100) / 100 },
        { time: 23, Up: Math.round(props.data.responseData[22].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[22].upTime * 100) / 100 },
        { time: 24, Up: Math.round(props.data.responseData[23].upTime * 100) / 100, Down: 100-Math.round(props.data.responseData[23].upTime * 100) / 100 },
      ];
    }

    if (props.data.responseData.length === 30) {
      data = [
        { time: 1, Up: Math.round(props.data.responseData[0].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[0].uptime * 100) / 100},
        { time: 2, Up: Math.round(props.data.responseData[1].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[1].uptime * 100) / 100 },
        { time: 3, Up: Math.round(props.data.responseData[2].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[2].uptime * 100) / 100 },
        { time: 4, Up: Math.round(props.data.responseData[3].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[3].uptime * 100) / 100 },
        { time: 5, Up: Math.round(props.data.responseData[4].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[4].uptime * 100) / 100 },
        { time: 6, Up: Math.round(props.data.responseData[5].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[5].uptime * 100) / 100 },
        { time: 7, Up: Math.round(props.data.responseData[6].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[6].uptime * 100) / 100 },
        { time: 8, Up: Math.round(props.data.responseData[7].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[7].uptime * 100) / 100 },
        { time: 9, Up: Math.round(props.data.responseData[8].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[8].uptime * 100) / 100 },
        { time: 10, Up: Math.round(props.data.responseData[9].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[9].uptime * 100) / 100 },
        { time: 11, Up: Math.round(props.data.responseData[10].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[10].uptime * 100) / 100 },
        { time: 12, Up: Math.round(props.data.responseData[11].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[11].uptime * 100) / 100},
        { time: 13, Up: Math.round(props.data.responseData[12].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[12].uptime * 100) / 100 },
        { time: 14, Up: Math.round(props.data.responseData[13].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[13].uptime * 100) / 100 },
        { time: 15, Up: Math.round(props.data.responseData[14].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[14].uptime * 100) / 100 },
        { time: 16, Up: Math.round(props.data.responseData[15].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[15].uptime * 100) / 100 },
        { time: 17, Up: Math.round(props.data.responseData[16].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[16].uptime * 100) / 100 },
        { time: 18, Up: Math.round(props.data.responseData[17].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[17].uptime * 100) / 100 },
        { time: 19, Up: Math.round(props.data.responseData[18].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[18].uptime * 100) / 100 },
        { time: 20, Up: Math.round(props.data.responseData[19].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[19].uptime * 100) / 100 },
        { time: 21, Up: Math.round(props.data.responseData[20].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[20].uptime * 100) / 100 },
        { time: 22, Up: Math.round(props.data.responseData[21].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[21].uptime * 100) / 100 },
        { time: 23, Up: Math.round(props.data.responseData[22].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[22].uptime * 100) / 100 },
        { time: 24, Up: Math.round(props.data.responseData[23].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[23].uptime * 100) / 100 },
        { time: 25, Up: Math.round(props.data.responseData[24].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[24].uptime * 100) / 100 },
        { time: 26, Up: Math.round(props.data.responseData[25].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[25].uptime * 100) / 100 },
        { time: 27, Up: Math.round(props.data.responseData[26].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[26].uptime * 100) / 100 },
        { time: 28, Up: Math.round(props.data.responseData[27].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[27].uptime * 100) / 100 },
        { time: 29, Up: Math.round(props.data.responseData[28].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[28].uptime * 100) / 100 },
        { time: 30, Up: Math.round(props.data.responseData[29].uptime * 100) / 100, Down: 100-Math.round(props.data.responseData[29].uptime * 100) / 100 },
      ];
    }
  }

  const keys = ["Up", "Down"];
const colors = ["#3AF219", "#E62805"];
  return (
    <>
    <Div data={props.data.responseData.length}>
      <ResponsiveBar
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        data={data}
        keys={keys}
        indexBy="time"
        colors={colors}
        enableLabel={false}
        enableGridY={true}
        padding={0.7}
        axisRight={null}
        axisTop={null}
        theme={theme}
        axisLeft={{
          tickSize: 2,
          tickValues: ["0", "50", "100"],
          tickPadding: 0
        }}
        margin={{ top: 4, bottom: 27, left: 20 }}
        gridYValues={["0"]}
        axisBottom={{
          tickSize: 2,
          tickValues: ["1","15","30"],
          tickPadding: 0,
          legend: "Day",
          legendPosition: "middle",
          legendOffset: 20
        }}
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
    <Div1 data={props.data.responseData.length}>
      <ResponsiveBar
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        data={data}
        keys={keys}
        indexBy="time"
        colors={colors}
        enableLabel={false}
        enableGridY={true}
        padding={0.7}
        axisRight={null}
        axisTop={null}
        theme={theme}
        axisLeft={{
          tickSize: 2,
          tickValues: ["0", "50", "100"],
          tickPadding: 0
        }}
        margin={{ top: 4, bottom: 27, left: 20 }}
        gridYValues={["0"]}
        axisBottom={{
          tickSize: 2,
          tickValues: ["1","12","24"],
          tickPadding: 0,
          legend: "Hour",
          legendPosition: "middle",
          legendOffset: 20
        }}
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
    </Div1>
    <Div2 data={props.data.responseData.length}>
      <ResponsiveBar
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        data={data}
        keys={keys}
        indexBy="time"
        colors={colors}
        enableLabel={false}
        enableGridY={true}
        padding={0.7}
        axisRight={null}
        axisTop={null}
        theme={theme}
        axisLeft={{
          tickSize: 2,
          tickValues: ["0", "50", "100"],
          tickPadding: 0
        }}
        margin={{ top: 4, bottom: 27, left: 20 }}
        gridYValues={["0"]}
        axisBottom={{
          tickSize: 2,
          tickValues: ["1","4","7"],
          tickPadding: 0,
          legend: "Day",
          legendPosition: "middle",
          legendOffset: 20
        }}
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
    </Div2>
    </>
  );
}
export default EfficiencyBar;
