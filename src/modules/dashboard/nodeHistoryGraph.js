import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";
import { linearGradientDef } from "@nivo/core";
import utility from "../../utility";
import { NodesService } from "../../services";

const Div = styled.div`
  height: 150px;
  width: 100%;
  max-width: 500px;
  margin-left: -5px;
`;

function NodeGraph() {
  const [node, setNode] = useState(0);
  const [node1, setNode1] = useState(0);
  const [node2, setNode2] = useState(0);
  const [node3, setNode3] = useState(0);
  const [node4, setNode4] = useState(0);
  const [node5, setNode5] = useState(0);
  const [node6, setNode6] = useState(0);
  const [maxVal, setMaxVal] = useState(0);

  async function fetchData() {
    const [error, res] = await utility.parseResponse(NodesService.getNodes());
    setMaxVal(Math.max.apply(Math, res.responseData.map(function(o) { return o.nodes; })));
    if (error) return;
    setNode(res?.responseData[0]?.nodes);
    setNode1(res?.responseData[1]?.nodes);
    setNode2(res?.responseData[2]?.nodes);
    setNode3(res?.responseData[3]?.nodes);
    setNode4(res?.responseData[4]?.nodes);
    setNode5(res?.responseData[5]?.nodes);
    setNode6(res?.responseData[6]?.nodes);
  }
  
  useEffect(()=>{
  fetchData();
  }, [])
  const data = [
    {
      id: "Stats",
      data: [
        {
          x: "0",
          y: node,
        },
        {
          x: "1",
          y: node1,
        },
        {
          x: "2",
          y: node2,
        },
        {
          x: "3",
          y: node3,
        },
        {
          x: "4",
          y: node4,
        },
        {
          x: "5",
          y: node5,
        },
        {
          x: "6",
          y: node6,
        },
      ],
    },
  ];

  const theme = {
    axis: {
      ticks: {
        text: {
          fill: "#667FC1",
        },
      },
    },
    grid: {
      line: {
        stroke: "#4E6AB580",
        strokeWidth: 0.9,
        strokeDasharray: "1 1",
      },
    },
  };

  return (
    <Div>
      {
        data[0].data[0].y.length === 0 ? (
            <div className="center-parent-div position-relative top-50px">
              <div className="dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
        ) : (
            <ResponsiveLine
                data={data}
                theme={theme}
                key={"Stats"}
                isInteractive={true}
                margin={{
                  top: 30,
                  right: 30,
                  bottom: 30,
                  left: 30,
                }}
                yScale={{
                  type: "linear",
                  stacked: true,
                  min: 0,
                  max: maxVal + 100,
                }}
                pointColor="#7299FF"
                tickSize
                pointSize={4}
                lineWidth="1px"
                enableArea={true}
                enableGridX={false}
                enableGridY={true}
                enableDotLabel={false}
                gridYValues={["0", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"]}
                axisLeft={{
                  tickSize: 0,
                  tickValues: ["0", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
                  tickPadding: 5
                }}
                axisBottom={false}
                colors={["#275FF5"]}
                areaOpacity={0.3}
                defs={[
                  linearGradientDef("gradientA", [
                    { offset: 55, color: "#275FF5" },
                    { offset: 100, color: "#102C78" },
                  ]),
                ]}
                fill={[{ match: { id: "Stats" }, id: "gradientA" }]}
            />
        )
      }

    </Div>
  );
}

export default NodeGraph;
