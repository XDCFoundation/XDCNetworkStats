import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import styled from "styled-components";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import ReactTooltip from "react-tooltip";

const MapDiv = styled.div`
  fill: #103aaa;
  width: 100%;
  max-width: 965px;
  border: none;
  @media(min-height: 500px) and (max-height: 600px){
    max-width: 500px;
    margin-left: 120px;
  }
  @media(min-height: 600px) and (max-height: 700px){
    max-width: 600px;
    margin-left: 120px;
  }
  @media(min-height: 700px) and (max-height: 800px){
    max-width: 700px;
    margin-left: 120px;
  }
  @media(min-height: 800px) and (max-height: 900px){
    max-width: 800px;
    margin-left: 120px;
  }
`;
const MainDiv = styled.div`
  display: flex;
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function CountryMap(props) {
  const [node, setNode] = useState([]);
  const [data, setData] = useState([]);
  const [tooltip, setTooltip] = useState("");
  const [markerSize, setMarkerSize] = useState(4);

  useEffect(() => {
  if(props.zoom >1 && props.zoom<=2){
  setMarkerSize(3);
  }
  else if(props.zoom >2 && props.zoom<=4){
    setMarkerSize(1.5);
  }
  else if(props.zoom >4 && props.zoom<=6){
    setMarkerSize(1);
  }
  else if(props.zoom >6 && props.zoom<=8){
    setMarkerSize(0.5);
  }
  else{
    setMarkerSize(4);
  }
  },[props.zoom]);

  useEffect(() => {
    if (props?.stats.markers && props?.stats.markers?.length >= 1) {
      (props?.stats.markers).map((item, index) => {
        setData(item);
      });
      async function fetchData() {
        setNode(props.stats.markers);
      }
      fetchData();
    }
  }, [props?.stats.markers]);

  const getNodesColor = (active, peers) => {
    if(!active)
      return '#dc3545';

    return (peers <= 1 ? '#dc3545' : (peers > 1 && peers < 4 ? '#ffc107' : '#3AF219'));
  }

  return (
    <MainDiv>
    <MapDiv data-tip="">
      <ComposableMap projectionConfig={{ scale: 180 }}>
      <ZoomableGroup
          zoom={props.zoom}
          center={props.center}
          onMoveEnd={props.click}
          translateExtent={[
            [0, -props.height],
            [props.width, props.height]
          ]}
        >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}/>
            ))
          }
        </Geographies>
        {node.map((items, index) => (
          <Marker className="marker" key={index} coordinates={items.coords} onMouseEnter={()=>{
          setTooltip(items.id);
          }} onMouseLeave={() => {
            setTooltip("");
          }}>
            <circle r={markerSize} fill={getNodesColor(items.active, items.peers)} />
          </Marker>
        ))}
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip arrowColor="transparent"
          textColor="black"
          borderColor="white"
          backgroundColor="white"
          border={true}
          place="bottom">{tooltip}</ReactTooltip>
    </MapDiv>
    </MainDiv>
  );
}


const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(CountryMap);
