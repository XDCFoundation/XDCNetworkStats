import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

const Div = styled.div`
  fill: #103aaa;
  width: 100%;

  @media (min-width: 300px) and (max-width: 767px) {
    fill: #103aaa;
    width: 310px;
    margin-left: -30px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    fill: #103aaa;
    width: 100%;
    max-width: 290px;
    margin-left: 44px;
  }
  @media (min-width: 2250px) {
    fill: #103aaa;
    width: 75%;
    margin-left: 50px;
  }

  @media (min-width: 2890px) {
    fill: #103aaa;
    width: 62%;
    margin-left: 96px;
  }

  @media (min-width: 3485px) {
    fill: #103aaa;
    width: 50%;
    margin-left: 135px;
  }

  @media (min-width: 4418px) {
    fill: #103aaa;
    width: 45%;
    margin-left: 180px;
  }
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map(props) {
  const [node, setNode] = useState([]);
  const [tooltip, setTooltip] = useState("");
  useEffect(() => {
    if (
      !_.isUndefined(props.stats.markers) &&
      !_.isEmpty(props.stats.markers)
    ) {
      setNode(props.stats.markers);
    }
  });

  const getNodesColor = (active, peers) => {
    if(!active)
      return '#dc3545';

    return (peers <= 1 ? '#dc3545' : (peers > 1 && peers < 4 ? '#ffc107' : '#3AF219'));
  }

  return (
    <Div data-tip="">
      {
        node.length === 0 ? (
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
      <ComposableMap
       width={800}
       height={450}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }} />
            ))
          }
        </Geographies>
        {node.map((items, index) => (
          <Marker className="marker" key={index} coordinates={items.coords} onMouseEnter={()=>{
            setTooltip(items.id);
            }} onMouseLeave={() => {
              setTooltip("");
            }}>
            <circle r={5} fill={getNodesColor(items.active, items.peers)} />
          </Marker>
        ))}
      </ComposableMap>
      <ReactTooltip arrowColor="transparent"
          textColor="black"
          borderColor="white"
          backgroundColor="white"
          border={true}
          place="bottom">{tooltip}</ReactTooltip>
    </Div>
  );
}

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(Map);
