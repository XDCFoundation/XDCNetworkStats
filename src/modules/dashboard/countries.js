import React, { useState } from "react";
import styled from "styled-components";
import CountryMap from "./countryMap";
import CountryTable from "./countryTable";

const TabDiv = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 1025px) {
    display: none;
  }
`;
const Img = styled.img`
  cursor: pointer;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 25px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 30px;
  }
`;
const CloseDiv = styled.div`
height: 100px;
`;

const SelectionDiv = styled.div`
  width: 37px;
  /* max-width: 133px; */
  border-radius: 4px;
  height: 28px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  background-color: #102C78;
  margin-top: 20px;
  @media (min-width: 300px) and (max-width: 1024px) {
  display: flex;
  margin-top: 0px;
  }
`;

const SelectionDivStyle = styled.div`
  content: url("images/ZoomIn.svg");
  padding: 6px;
  height: 37px;
  width: 100%;
  border: 1px solid #103EB7;
  cursor: pointer;
  color: "#3C70FF";
  background-color: #102C78;
  @media (min-width: 300px) and (max-width: 1024px) {
    height: 28px;
  }
`;
const SelectionDivStyleTwo = styled.div`
  content: url("images/ZoomOut.svg");
  padding: 6px;
  height: 37px;
  width: 100%;
  border: 1px solid #103EB7;
  cursor: pointer;
  color: "#3C70FF";
  background-color: #102C78;
  @media (min-width: 300px) and (max-width: 1024px) {
    height: 28px;
  }
`;

const Close = styled.img`
  cursor: pointer;
`;

const BottomDiv = styled.div`
display: flex;
justify-content: right;
`;

const LabelBottom = styled.div`
color: white;
font-family: 'Inter', Medium;
font-weight: 500;
margin-left: 5px;
margin-right: 15px;
@media (min-width: 300px) and (max-width: 1024px) {
font-size: 10px;
align-items: center;
justify-items: center;
display: flex;
  }
`;

const Footer = styled.div`
  background-color: white;
  color: #808080;
  text-align: center;
  /* display: flex; */
  align-items: center;
  padding-bottom: 20px;
  padding-top: 17px;
  font-family: "Inter", sans-serif;
  white-space: nowrap;
  font-size: 0.8rem;
`;

const Div = styled.div`
  background-color: #102e84;
  width: auto;
  height: 100vh;
  padding: 15px;
  @media (min-width: 300px) and (max-width: 1024px) {
    height: 100%;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftDiv = styled.div`
  padding-left: 47px;
  padding-top: 57px;
  color: #667fc1;
  font-size: 16px;
  @media (min-width: 300px) and (max-width: 1024px) {
    padding-left: 10px;
    padding-top: 0px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    padding-left: 10px;
  }
`;

const Label = styled.div`
  font-size: 26px;
  color: white;
  font-family: "Inter";
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  @media(min-height: 500px) and (max-height: 600px){
    max-height: 450px;
  }
  @media(min-height: 600px) and (max-height: 700px){
    max-height: 470px;
  }
  @media(min-height: 700px) and (max-height: 800px){
    max-height: 570px;
  }
  @media(min-height: 800px) and (max-height: 900px){
    max-height: 650px;
  }
`;

const TableDiv = styled.div`
height: 100%;
width: 40%;
padding-top: 40px;
padding-left: 40px;
@media (min-width: 300px) and (max-width: 1024px) {
  width: 100%;
  padding: 40px;
}
@media (min-width: 300px) and (max-width: 767px) {
  padding: 10px; }
`;

const MapDiv = styled.div`
  height: 100%;
  width: 60%;
  padding-right: 40px;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    padding-right: 0px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
    padding-right: 0px;
    padding-top: 20px;
  }
`;

const DesktopDiv = styled.div`
  
  @media (min-width: 300px) and (max-width: 1024px) {
    display: none;
  }
`;

export default function Countries(props) {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const mapWidth = 800;
  const mapHeight = 600;

  return (
    <>
      <Div>
        <DesktopDiv>
          <SpaceBetween>
            <LeftDiv>
              Nodes
              <Label>Top 10 Countries</Label>
            </LeftDiv>
            <div>
            <div>
              <Close
                src="/images/Collapse.svg"
                alt="close"
                onClick={() => {
                  props.expand(false);
                }}
              />
            </div>
            <SelectionDiv>
              <SelectionDivStyle onClick={handleZoomIn} />
              <SelectionDivStyleTwo onClick={handleZoomOut} />
            </SelectionDiv>
            </div>
          </SpaceBetween>
          <MainContainer>
            <TableDiv>
              <CountryTable />
            </TableDiv>
            <MapDiv>
              <CountryMap
                zoom={position.zoom}
                center={position.coordinates}
                click={handleMoveEnd}
                width={mapWidth}
                height={mapHeight}
              />
            </MapDiv>
          </MainContainer>
             <BottomDiv>
             <Img src="images/Green.svg"/>
             <LabelBottom>Active</LabelBottom>
             <Img src="images/Orange.svg"/>
             <LabelBottom>Moderate</LabelBottom>
             {/* <Img src="images/Yellow.svg"/>
             <LabelBottom>Moderate</LabelBottom> */}
             <Img src="images/Red.svg"/>
             <LabelBottom>Inactive</LabelBottom>
            </BottomDiv>
        </DesktopDiv>
        <TabDiv>
          <SpaceBetween>
            <MapDiv>
              <CountryMap
                zoom={position.zoom}
                center={position.coordinates}
                click={handleMoveEnd}
                width={mapWidth}
                height={mapHeight}
              />
              <BottomDiv>
             <img src="images/Green.svg" alt=""/>
             <LabelBottom>Active</LabelBottom>
             <img src="images/Orange.svg" alt=""/>
             <LabelBottom>Moderate</LabelBottom>
             {/* <img src="images/Yellow.svg"/>
             <LabelBottom>Moderate</LabelBottom> */}
             <img src="images/Red.svg" alt=""/>
             <LabelBottom>Inactive</LabelBottom>
             <SelectionDiv>
              <SelectionDivStyle onClick={handleZoomIn} />
              <SelectionDivStyleTwo onClick={handleZoomOut} />
            </SelectionDiv>
            </BottomDiv>
            </MapDiv>
            <CloseDiv>
            <div>
              <Img
                src="/images/Collapse.svg"
                alt="close"
                onClick={() => {
                  props.expand(false);
                }}
              />
            </div>
            </CloseDiv>
          </SpaceBetween>
          <LeftDiv>
            Nodes
            <Label>Top 10 Countries</Label>
          </LeftDiv>
          <TableDiv>
            <CountryTable />
          </TableDiv>
        </TabDiv>
      </Div>
      <Footer>© 2022 XDC Network. All Rights Reserved.</Footer>
    </>
  );
}


