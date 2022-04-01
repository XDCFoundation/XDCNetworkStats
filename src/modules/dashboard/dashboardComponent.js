import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Map from "./map";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";
import NodeGraph from "./nodeHistoryGraph";
import Country from "./countries";
import Joyride, { STATUS } from "react-joyride";
import Header from "../header/header";
import NumberFormat from "react-number-format";
import utility from "../../utility";
import NodesService from "../../services/nodes";
import { eventConstants } from "../../constants";
import store from "../../store";
import SideDrawer from "./sideDrawer";
import BackDrop from "./backDrop";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import Table from "./table";

const TOUR_STEPS = [
  {
    target: ".security",
    content:
      "View the number of active nodes, their history and geolocation in real-time on the Network Stats. The visibility of live network data helps bring transparency and security to the XDC users.",
    disableBeacon: true,
  },
  {
    target: ".speed",
    content:
      "Explore the best block, average block time, and the last block created on-chain. Visualize the speed of the XDC Network and understand the value proposition of the network.",
    disableBeacon: true,
  },
  {
    target: ".efficiency",
    content:
      "Showcases the efficiency of the blockchain with zero downtime, negligible gas price, and average transaction rate displayed transparently.",
    disableBeacon: true,
  },
];

const Div = styled.div`
  width: 100%;
`;

const JoyrideTextContainer = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  font-size: 13px !important;
  color: #1f1f1f !important;
  font-family: "Inter", Regular !important;
  font-weight: 400,
  width: 100%;
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

const JoyrideNextButton = styled.button`
  background-color: #2358e5;
  outline: none;
  border: none;
  width: 100%;
  max-width: 63px;
  color: white;
  border-radius: 2px;
  padding: 4px;
  font-size: 12px;
  font-weight: 50;
  display: ${(props) => (props.showBackCount === 2 ? "none" : "flex")};
  justify-content: center;
  align-items: center;
`;

const JoyrideEndButton = styled.button`
  background-color: #2358e5;
  outline: none;
  border: none;
  width: 100%;
  max-width: 63px;
  color: white;
  border-radius: 2px;
  padding: 4px;
  font-size: 12px;
  font-weight: 50;
  display: ${(props) => (props.showBackCount === 2 ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const BackDropStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  top: 390px;
  right: 0;
  @media (min-width: 1025px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    top: 336px;
  }
`;
const JoyrideBackButton = styled.div`
  font-size: 0.8rem;
  font-family: Inter;
  font-weight: 600;
  color: #2256df;
  border-radius: 4px;
  padding: 4px;

  align-items: center;
  justify-content: center;
  margin-right: 14px;
  display: ${(props) => (props.showBackCount === 0 ? "none" : "flex")};
`;

const Img = styled.img`
  display: flex;
  justify-content: flex-end;
`;

const MainContainer = styled.div`
  width: 100%;
`;
const Title = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Inter', Medium;
  border-right: 1px solid #274598;
  padding: 8px 6px 8px 16px;
`;
const Span = styled.div`
  font-size: 10px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 4px;
`;
const DisplayFlex = styled.div`
  display: flex;
  color: #ffffff;
  align-items: center;
  text-align: center;
  margin-top: 8px;
`;
const FlexStyled = styled.div`
  flex: 1;
  font-size: 12px;
  color: #c8d1f1;
  display: flex;
  align-items: center;
  text-align: center;
  @media (min-width: 768px) and (max-width: 1024px) {
  padding-left: 10px;
  }
`;
const FlexStyledOne = styled.div`
  color: #c8d1f1;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
`;
const TabSecurity = styled.div`
  width: 33.33%;
  font-size: 16px;
  border-right: 2px solid #274598;
  font-weight: 500;
  font-family: 'Inter', Medium;
  padding: 4px 11px 4px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.back === 1 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.back === 1 ? "#FFFFFF" : "#C8D1F1")};
`;
const TabSpeed = styled.div`
  width: 33.33%;
  font-size: 16px;
  border-right: 2px solid #274598;
  font-weight: 500;
  font-family: 'Inter', Medium;
  padding: 4px 11px 4px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.back === 2 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.back === 2 ? "#FFFFFF" : "#C8D1F1")};
`;
const TabEfficiency = styled.div`
  width: 33.33%;
  font-size: 16px;
  border-right: 2px solid #274598;
  font-weight: 500;
  font-family: 'Inter', Medium;
  padding: 4px 11px 4px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.back === 3 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.back === 3 ? "#FFFFFF" : "#C8D1F1")};
`;

const MobileTitleSecurity = styled.div`
  width: 33.33%;
  font-size: 1rem;
  border-right: 2px solid #274598;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 1 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.show === 1 ? "#FFFFFF" : "#C8D1F1")};
  font-weight: 500;
  font-family: 'Inter', Medium;
`;
const MobileTitleSpeed = styled.div`
  width: 33.33%;
  font-size: 1rem;
  border-right: 2px solid #274598;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 2 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.show === 2 ? "#FFFFFF" : "#C8D1F1")};
  font-weight: 500;
  font-family: 'Inter', Medium;
  
`;
const MobileTitleEfficiency = styled.div`
  width: 33.33%;
  font-size: 1rem;
  border-right: 2px solid #274598;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 3 ? "#4065cb" : "#1c3c93")};
  color: ${(props) => (props.show === 3 ? "#FFFFFF" : "#C8D1F1")};
  font-weight: 500;
  font-family: 'Inter', Medium;
`;
const ContentSecurity = styled.div`
  background-color: #102c78;
  height: 270px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;

  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentSecurityMobile = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 33.33%;
  padding: 15px;
  border-right: 1px solid #274598;

  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 300px;
  }
`;
const ContentSpeed = styled.div`
  background-color: #102c78;
  height: 270px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentEfficiency = styled.div`
  background-color: #102c78;
  height: 270px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentParent = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    display: none;
  }
`;
const TabScreen = styled.div`
  @media (min-width: 300px) and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;
const MobileContentParent = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 767px) {
    display: none;
  }
`;
const Heading = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
`;
const ColorDivNodes = styled.div`
  font-size: 1rem;
  font-weight: 600;
  height: 27px;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 1 ? "2px solid #ffffff" : ""};
  color: ${(props) => (props.mobileTab === 1 ? "white" : "#667fc1")};
`;
const ColorDivCountries = styled.div`
  font-size: 1rem;
  height: 27px;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 2 ? "2px solid #ffffff" : ""};
  color: ${(props) => (props.mobileTab === 2 ? "white" : "#667fc1")};
`;
const ContentData = styled.div`
  width: 50%;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
  }
`;

const ContentDataEfficiencyDesk = styled.div`
  width: 45%;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
  }
`;

const ContentDataSpeedIpad = styled.div`
  width: 38%;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
  }
`;

const ContentDataEfficiencyIpad = styled.div`
  width: 38%;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
  }
`;

const DataCount = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 15px;
  }
`;
const NodeHistory = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 15px;
  white-space: nowrap;
`;
const DesktopAvgBlockTime = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 68px;
  white-space: nowrap;
`;
const CountryData = styled.div`
  width: 50%;
`;

const CountryDataEfficiencyDesk2 = styled.div`
  width: 55%;
`;
const ContentDataSpeedIpad2= styled.div`
  width: 62%;
`;

const ContentDataSpeedIpadLabel= styled.div`
padding-left: 7px;
`;

const ContentDataEfficiencyIpadLabel= styled.div`
padding-left: 35px;
`;


const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EfficiencyContentDiv = styled.div`
  height: 90px;
`;

const EfficiencyLabel = styled.div`
margin-left: 30px;
`;
const SpeedLabel = styled.div`
`;

const Countries = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #667fc1;
`;
const CountriesData = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;
const Image = styled.img`
  width: 25px;
  padding-bottom: 25px;
  cursor: pointer;
  @media (min-width: 767px) and (max-width: 1024px) {
    width: 25px;
  }
`;
const BlockTime = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;
const Speedbar = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  @media (min-width: 768px) and (max-width: 1024px) {
  max-width: 800px;
  }
`;
const TableDiv = styled.div`
  background: #f8f8f8;
  border-radius: 4px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  padding-bottom: 42px;
  min-height: 60vh;
  @media (min-width: 300px) and (max-width: 1024px) {
    padding: 30px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    padding: 15px;
  }
`;

const BestBlockData = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
`;
const MobileSpeedBlock = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 100%;
  padding: 15px;
  border-right: 1px solid #274598;
`;

const LastBLockData = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
`;

const MobDiv = styled.div`
  color: #667fc1;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter;
  margin-top: 5px;
`;
const DataMobDiv = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 5px;
`;

const MobileAverageBlock = styled.div`
  color: #667fc1;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter;
  white-space: nowrap;
  `;

const MobileGraphDiv = styled.div`
  width: 100%;
  /* margin-top: 20px; */
`;
const MapWidth = styled.div`
  width: 100%;
  padding-left: 40px;
`;
const TabContainer = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: none;
  height: 33px;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
  }
`;
const MobileContainer = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;

  @media (min-width: 767px) {
    display: none;
  }
`;
const Container = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const FullScreen = styled.div`
  @media (min-width: 100px) and (max-width: 1024px) {
    display: none;
  }
`;

const MapDiv = styled.div`
  /* margin-left: -38px; */
  width: 100%;
`;
const EthDiv = styled.div`
  font-size: 14px;
  font-family: "Inter";
  color: #3af219;
  margin-bottom: 45px;
`;
const SelectionDiv = styled.div`
  display: flex;
  width: 100%;

  max-width: 133px;
  border-radius: 4px;
  height: 28px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-top: 12px;
  background-color: #1c3c93;
  margin-right: 22px;

  @media (min-width: 300px) and (max-width: 767px) {
  margin-right: 0px
  }
`;
const SelectionDivStyle = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  height: 28px;
  width: 100%;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #2149B9;
  cursor: pointer;

  color: ${(props) => (props.buttonToggle === 1 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 1 ? "#2149B9" : "#1C3C93"};
 
`;
const SelectionDivStyleTwo = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  width: 100%;
  height: 28px;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #2149B9;
  cursor: pointer;
  color: ${(props) => (props.buttonToggle === 2 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 2 ? "#2149B9" : "#1C3C93"};

`;
const SelectionDivStyleThree = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  height: 28px;
  width: 100%;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #2149B9;
  cursor: pointer;
  color: ${(props) => (props.buttonToggle === 3 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 3 ? "#2149B9" : "#1C3C93"};

`;



function Dashboard(props) {
  const { content } = props;
  const [Expand, setCountry] = React.useState(false);
  const changeExpand = (value) => {
    setCountry(value);
  };
  const [joyrideRun, setJoyrideRun] = useState(false);
  const [step, setStep] = useState();
  const handleJoyrideCallback = (data) => {
    const { status, action} = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (action === "close") {
      setJoyrideRun(false);
      setStep(0);
    }
    if (action === "update") {
    }
    if (finishedStatuses.includes(status)) {
      setJoyrideRun(false);
    }
  };
  const [showSideDrop, setShowSideDrop] = useState(false);
  const [show, setShow] = useState(1);
  const [mobileTab, setMobileTab] = useState(1);
  const [gasUsd, setGasUsd] = useState(0);
  const [Eth, setEth] = useState(0);
  const [tabResponsive, setTabResponsive] = useState(1);
  const [buttonToggle, setButtonToggle] = useState(3);
  const [upTime, setUpTime] = useState(0);

  async function fetchTime(value = 1) {
    const [error, res] = await utility.parseResponse(
      NodesService.getUpTime(value)
    );
    if(error){
      console.log("error", error);
    }
    let sum = 0;
    let avg = 0;
    if(res.responseData.length === 24){
        sum = res.responseData.reduce((a,b)=> a+b.upTime,0)
        avg = sum/24;
        setUpTime((avg).toFixed(2))
    }
    else if(res.responseData.length === 7)
    {
      sum = res.responseData.reduce((a,b)=> a+b.uptime,0)
      avg = sum/7;
      setUpTime((avg).toFixed(2))
    }
    else{
      sum = res.responseData.reduce((a,b)=> a+b.uptime,0)
      avg = sum/30;
      setUpTime((avg).toFixed(2))
    }
    
    store.dispatch({ type: eventConstants.UPDATE_EFFICIENCY, data: res });
  }
  async function EthVal(){
    const [error, resp] = await utility.parseResponse(NodesService.getEth());
    if(error){
    console.log("error", error);
    }
    if(!resp){
    let EthVal = `${Math.round(((resp && resp.normal.usd - props.stats.gasPrice) / resp && resp.normal.usd) *100 * 1000000) / 1000000}%`;
    if(!isNaN(parseFloat(EthVal))) {
      setEth(EthVal);
    }
  }}
  useEffect(()=>{
    fetchTime();
  },[]);

  useEffect(() => {
    let value = props.stats.gasPrice ?  props.stats.gasPrice.toFixed(8) : "";
    if(!isNaN(value)){
    setGasUsd(value);
    EthVal();
    }
  }, [props.stats.gasPrice]);


  const [showTabJoyRide, setShowTabJoyRide] = useState(false);
  document.body.style.overflow = showTabJoyRide ? "hidden" : "unset";
  const buttonTour = () => {
    setShow(show + 1);
    showSetText(setText + 1);
    setTabResponsive(tabResponsive + 1);
    if (show > 2) setShow(0);
    if (setText > 1) showSetText(0);
    if (tabResponsive > 2) setTabResponsive(0);
  };

  const [setText, showSetText] = useState(0);
  const [showBackButton, setShowBackButton] = useState(true);
  const backButtonTour = () => {
    setShow(show - 1);
    showSetText(setText - 1);
    setTabResponsive(tabResponsive - 1);
  };

  const [showTable, setShowTable] = useState();
  const [showExpandedCountry, setShowExpandedCountry] = useState();
  
  useEffect(()=>{
  setShowTable(<Table/>);
  setShowExpandedCountry(<Country expand={setCountry}/>)
  },[])

  return (
    <Div>
      <Joyride
        steps={TOUR_STEPS}
        callback={handleJoyrideCallback}
        continuous={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "#2358E5",
            border: "none",
            width: 77,
            borderRadius: 0,
            fontSize: 14,
            fontFamily: "Inter-Regular",
            fontWeight: 50,
            marginTop: 2,
            marginRight: -5
          },
          buttonBack: {
            marginRight: 10,
            color: "#2256DF",
            fontSize: 13,
          },
          buttonClose: {
            size: 1,
            padding: 10,
            width: 10,
          }
        }}
        spotlightPadding={0}
        run={joyrideRun}
        stepIndex={step}
        disableScrolling={true}
        floaterProps={{ disableAnimation: true, placement: "bottom" }}
        locale={{
          last: 'End'
        }}
      />

      {showTabJoyRide && (
        <BackDropStyle>
          <div className="flex">
            <div className="tooltip">
              <div className="flex-img">
                <Img
                  src="/images/Close.svg"
                  onClick={() => {
                    setShowTabJoyRide(false);
                    setShow(1);
                    showSetText(0);
                  }}
                />
              </div>
              <JoyrideTextContainer>
                {TOUR_STEPS[setText].content}
              </JoyrideTextContainer>
              <div className="flex-condition">
                {showBackButton ? (
                  <>
                  <JoyrideBackButton
                    showBackCount={setText}
                    onClick={() => backButtonTour()}
                  >
                    Back
                  </JoyrideBackButton>
                  <JoyrideEndButton
                    showBackCount={setText}
                    onClick={() => {setShowTabJoyRide(false);
                      setShow(1);
                      showSetText(0)}}
                  >
                    End
                  </JoyrideEndButton>
                </>
                ) : (
                  ""
                )}
                <JoyrideNextButton
                  onClick={() => buttonTour()}
                  showBackCount={setText}
                >
                  Next
                </JoyrideNextButton>
              </div>
            </div>
          </div>
        </BackDropStyle>
      )}

      <Header
        setJoyrideRun={setJoyrideRun}
        setShowTabJoyRide={setShowTabJoyRide}
        showTabJoyRide={showTabJoyRide}
        showSideDrop={showSideDrop}
        setShowSideDrop={setShowSideDrop}
        expand={setCountry}
        mobile={setShow}
        tab={setTabResponsive}
      />
      {showSideDrop ? (
        <div>
          <SideDrawer
            showSideDrop={showSideDrop}
            setShowSideDrop={setShowSideDrop}
          />
          <BackDrop />
        </div>
      ) : null}

      {Expand === 2 ? (
        <div>{showExpandedCountry}</div>
      ) : (
        <>
          <MainContainer>
            <Container>
              <Title>Security</Title>
              <Title>Speed</Title>
              <Title>Efficiency</Title>
            </Container>
            <MobileContainer>
              <MobileTitleSecurity
                show={show}
                onClick={() => {
                  setShow(1);
                  setShowTabJoyRide(false);
                }}
              >
                Security
              </MobileTitleSecurity>
              <MobileTitleSpeed
                show={show}
                onClick={() => {
                  setShow(2);
                  setShowTabJoyRide(false);
                }}
              >
                Speed
              </MobileTitleSpeed>
              <MobileTitleEfficiency
                show={show}
                onClick={() => {
                  setShow(3);
                  setShowTabJoyRide(false);
                }}
              >
                Efficiency
              </MobileTitleEfficiency>
            </MobileContainer>
            <TabContainer>
              <TabSecurity
                back={tabResponsive}
                onClick={() => {
                  setTabResponsive(1);
                  setShowTabJoyRide(false);
                }}
              >
                Security
              </TabSecurity>
              <TabSpeed
                back={tabResponsive}
                onClick={() => {
                  setTabResponsive(2);
                  setShowTabJoyRide(false);
                }}
              >
                Speed
              </TabSpeed>
              <TabEfficiency
                back={tabResponsive}
                onClick={() => {
                  setTabResponsive(3);
                  setShowTabJoyRide(false);
                }}
              >
                Efficiency
              </TabEfficiency>
            </TabContainer>
            <FullScreen>
              <ContentParent>
                <ContentSecurity className="security">
                  <ContentData>
                    <Heading>Nodes</Heading>
                    {
                      props.stats.totalNodes === 0 ? (
                              <div className="animated-background"></div>
                          ) :
                          (
                              <DataCount>
                                {props.stats.nodes}/{props.stats.totalNodes}
                              </DataCount>
                          )
                    }
                    <NodeHistory>Node History (7 Days)</NodeHistory>
                    <NodeGraph />
                  </ContentData>
                  <CountryData>
                    <SpaceBetween>
                      <div>
                        <Countries>Countries</Countries>
                        {
                          props.stats.countries === 0 ? (
                                  <div className="animated-background"></div>
                              ) :
                              (
                                  <CountriesData>{props.stats.countries}</CountriesData>
                              )
                        }
                      </div>
                      <Image
                        src="/images/Expand.svg"
                        onClick={() => changeExpand(2)}
                      />
                    </SpaceBetween>
                    <Map />
                  </CountryData>
                </ContentSecurity>

                <ContentSpeed className="speed">
                  <ContentDataEfficiencyDesk>
                    <Heading>Best Block</Heading>
                    {
                      props.stats.bestBlock === 0 ? (
                          <div className="animated-background"></div>
                      ) :
                          (
                              <DataCount>
                                #{" "}
                                <NumberFormat
                                    value={props.stats.bestBlock}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                />
                              </DataCount>
                          )
                    }
                    <DesktopAvgBlockTime>Avg Block Time</DesktopAvgBlockTime>
                    {
                      props.stats.avgBlock === 0 ? (
                              <div className="animated-background"></div>
                          ) :
                          (
                              <BlockTime>{(props.stats.avgBlock).toFixed(4) + " "}Sec</BlockTime>
                          )
                    }
                  </ContentDataEfficiencyDesk>

                  <CountryDataEfficiencyDesk2>
                    <SpaceBetween>
                      <SpeedLabel>
                        <Countries>Best Block Generated</Countries>
                        {
                          props.stats.bestBlock === 0 ? (
                                  <div className="animated-background"></div>
                              ) :
                              (
                                  <CountriesData>{props.stats.lastBlock}</CountriesData>
                              )
                        }
                      </SpeedLabel>
                    </SpaceBetween>
                    <Speedbar>
                      <LastBlockBar />
                    </Speedbar>
                    <DisplayFlex>
                      <FlexStyled>
                        Min &nbsp;<Span>1s</Span>
                      </FlexStyled>
                      <FlexStyledOne>
                        Max &nbsp;<Span>26s</Span>
                      </FlexStyledOne>
                    </DisplayFlex>
                  </CountryDataEfficiencyDesk2>
                </ContentSpeed>

                <ContentEfficiency className="efficiency">
                  <ContentDataEfficiencyDesk>
                    <Heading>Avg Transaction Fee(USD)</Heading>
                    {
                      props.stats.bestBlock === 0 ? (
                              <div className="animated-background"></div>
                          ) :
                          (
                              <div>
                              <DataCount>{gasUsd}</DataCount>
                              <EthDiv>
                                <img src="/images/Down.svg" alt=" " />
                                {" " + Eth} less than Ethereum
                              </EthDiv>
                              </div>
                          )
                    }

                    <NodeHistory>Avg Transaction/Second</NodeHistory>
                    {
                      props.stats.avgRate === 0 ? (
                              <div className="animated-background"></div>
                          ) :
                          (
                              <BlockTime>{props.stats.avgRate.toFixed(2) + " "}TPS</BlockTime>
                          )
                    }
                  </ContentDataEfficiencyDesk>
                  <CountryData>
                    <SpaceBetween>
                      <EfficiencyLabel>
                        <Countries>Up Time</Countries>
                        {
                          upTime === 0 ? (
                                  <div className="animated-background"></div>
                              ) :
                              (
                                  <CountriesData>{upTime}%</CountriesData>
                              )
                        }
                      </EfficiencyLabel>

                      <SelectionDiv>
                        <SelectionDivStyle
                          onClick={() => {
                            fetchTime(30);
                            setButtonToggle(1);
                          }}
                          buttonToggle={buttonToggle}
                        >
                          30D
                        </SelectionDivStyle>

                        <SelectionDivStyleTwo
                          buttonToggle={buttonToggle}
                          onClick={() => {
                            fetchTime(7);
                            setButtonToggle(2);
                          }}
                          style={{ borderRadius: "0px" }}
                        >
                          7D
                        </SelectionDivStyleTwo>
                        <SelectionDivStyleThree
                          buttonToggle={buttonToggle}
                          onClick={() => {
                            fetchTime(1);
                            setButtonToggle(3);
                          }}
                          style={{
                            borderRight: "none",
                            borderRadius: "0px 4px 4px 0px",
                          }}
                        >
                          24H
                        </SelectionDivStyleThree>
                      </SelectionDiv>
                    </SpaceBetween>
                    <Speedbar>
                      {
                        props?.stats?.efficiency?.length === 0 ? (
                            <div className="center-parent-div position-relative top-50px">
                              <div className="dots">
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            </div>
                        ) : (
                            <UpTimeBar data={props?.stats?.efficiency}></UpTimeBar>
                        )
                      }
                      {/*{props.stats?.efficiency?.length !== 0 ? (*/}
                      {/*  <UpTimeBar data={props.stats.efficiency}></UpTimeBar>*/}
                      {/*) : (*/}
                      {/*  <div></div>*/}
                      {/*)}*/}
                    </Speedbar>
                  </CountryData>
                </ContentEfficiency>
              </ContentParent>
            </FullScreen>
            <TabScreen>
              <ContentParent>
                {tabResponsive <= 1 ? (
                  <ContentSecurity className="security">
                    <ContentData>
                      <Heading>Nodes</Heading>
                      {
                        props.stats.totalNodes === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <DataCount>
                                  {props.stats.nodes}/{props.stats.totalNodes}
                                </DataCount>
                            )
                      }
                      <NodeHistory>Node History (7 Days)</NodeHistory>
                      <NodeGraph />
                    </ContentData>
                    <CountryData>
                      <SpaceBetween>
                        <div>
                          <Countries>Countries</Countries>
                          {
                            props.stats.countries === 0 ? (
                                    <div className="animated-background"></div>
                                ) :
                                (
                                    <CountriesData>{props.stats.countries}</CountriesData>
                                )
                          }
                        </div>
                        <Image
                          src="/images/Expand.svg"
                          onClick={() => {changeExpand(2);setShowTabJoyRide(false);}}
                        />
                      </SpaceBetween>
                      <MapDiv>
                        <Map />
                      </MapDiv>
                    </CountryData>
                  </ContentSecurity>
                ) : (
                  ""
                )}
                {tabResponsive === 2 ? (
                  <ContentSpeed className="speed">
                    <ContentDataSpeedIpad>
                      <Heading>Best Block</Heading>
                      {
                        props.stats.bestBlock === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <DataCount>
                                  #{" "}
                                  <NumberFormat
                                      value={props.stats.bestBlock}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                  />
                                </DataCount>
                            )
                      }
                      <div style={{ marginTop: "55px" }}></div>
                      <NodeHistory>Avg Block Time</NodeHistory>
                      <BlockTime>{props.stats.avgBlock.toFixed(4) + " "}Sec</BlockTime>
                    </ContentDataSpeedIpad>

                    <ContentDataSpeedIpad2>
                      <SpaceBetween>
                        <ContentDataSpeedIpadLabel>
                          <Countries>Best Block Generated</Countries>
                          {
                            props.stats.bestBlock === 0 ? (
                                    <div className="animated-background"></div>
                                ) :
                                (
                                    <CountriesData>{props.stats.lastBlock}</CountriesData>
                                )
                          }
                        </ContentDataSpeedIpadLabel>
                      </SpaceBetween>
                      <Speedbar>
                        <LastBlockBar />
                      </Speedbar>
                      <DisplayFlex>
                        <FlexStyled>
                          Min &nbsp;<Span>1s</Span>
                        </FlexStyled>
                        <FlexStyledOne>
                          Max &nbsp;<Span>26s</Span>
                        </FlexStyledOne>
                      </DisplayFlex>
                    </ContentDataSpeedIpad2>
                  </ContentSpeed>
                ) : (
                  ""
                )}
                {tabResponsive === 3 ? (
                  <ContentEfficiency className="efficiency">
                    <ContentDataEfficiencyIpad>
                      <Heading>Avg Transaction Fee(USD)</Heading>
                      {
                        props.stats.bestBlock === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <div>
                                  <DataCount>{gasUsd}</DataCount>
                                  <EthDiv>
                                    <img src="/images/Down.svg" alt=" " />
                                    {" " + Eth} less than Ethereum
                                  </EthDiv>
                                </div>
                            )
                      }
                      <NodeHistory>Avg Transaction/Second</NodeHistory>
                      {
                        props.stats.avgRate === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <BlockTime>{props.stats.avgRate.toFixed(2) + " "}TPS</BlockTime>
                            )
                      }
                    </ContentDataEfficiencyIpad>
                    <ContentDataSpeedIpad2>
                      <SpaceBetween>
                        <ContentDataEfficiencyIpadLabel>
                          <Countries>Up Time</Countries>
                          {
                            upTime === 0 ? (
                                    <div className="animated-background"></div>
                                ) :
                                (
                                    <CountriesData>{upTime}%</CountriesData>
                                )
                          }
                        </ContentDataEfficiencyIpadLabel>
                        <SelectionDiv>
                          <SelectionDivStyle
                            onClick={() => {
                              fetchTime(30);
                              setButtonToggle(1);
                            }}
                            buttonToggle={buttonToggle}
                          >
                            30D
                          </SelectionDivStyle>

                          <SelectionDivStyleTwo
                            buttonToggle={buttonToggle}
                            onClick={() => {
                              fetchTime(7);
                              setButtonToggle(2);
                            }}
                            style={{ borderRadius: "0px" }}
                          >
                            7D
                          </SelectionDivStyleTwo>
                          <SelectionDivStyleThree
                            buttonToggle={buttonToggle}
                            onClick={() => {
                              fetchTime(1);
                              setButtonToggle(3);
                            }}
                            style={{
                              borderRight: "none",
                              borderRadius: "0px 4px 4px 0px",
                            }}
                          >
                            24H
                          </SelectionDivStyleThree>
                        </SelectionDiv>
                      </SpaceBetween>
                      <Speedbar>
                        {
                          props?.stats?.efficiency.length === 0 ? (
                              <div className="center-parent-div position-relative top-50px">
                                <div className="dots">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              </div>
                          ) : (
                              <UpTimeBar data={props?.stats?.efficiency}></UpTimeBar>
                          )
                        }
                        {/*<UpTimeBar data={props.stats.efficiency}></UpTimeBar>*/}
                      </Speedbar>
                    </ContentDataSpeedIpad2>
                  </ContentEfficiency>
                ) : (
                  ""
                )}
              </ContentParent>
            </TabScreen>
            <MobileContentParent>
              {show <= 1 ? (
                <ContentSecurityMobile>
                  <SpaceBetween>
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <ColorDivNodes
                        mobileTab={mobileTab}
                        onClick={() => {
                          setMobileTab(1);
                        }}
                      >
                        Nodes
                      </ColorDivNodes>
                      &nbsp;&nbsp;&nbsp;
                      <ColorDivCountries
                        mobileTab={mobileTab}
                        onClick={() => {
                          setMobileTab(2);
                        }}
                      >
                        Countries
                      </ColorDivCountries>
                    </div>
                    <Image
                      src="/images/Expand.svg"
                      onClick={() => {changeExpand(2);setShowTabJoyRide(false);}}
                    />
                  </SpaceBetween>
                  {mobileTab <= 1 ? (
                    <ContentData>
                      <Heading>Nodes</Heading>
                      {
                        props.stats.totalNodes === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <DataCount>
                                  {props.stats.nodes}/{props.stats.totalNodes}
                                </DataCount>
                            )
                      }
                      <NodeHistory>Node History (7 Days)</NodeHistory>
                      <MobileGraphDiv>
                        <NodeGraph />
                      </MobileGraphDiv>
                    </ContentData>
                  ) : (
                    ""
                  )}
                  {mobileTab === 2 ? (
                    <CountryData>
                      <SpaceBetween>
                        <div>
                          <Countries>Countries</Countries>
                          {
                            props.stats.countries === 0 ? (
                                    <div className="animated-background"></div>
                                ) :
                                (
                                    <BestBlockData>{props.stats.countries}</BestBlockData>
                                )
                          }
                        </div>
                      </SpaceBetween>
                      <MapWidth>
                        <Map />
                      </MapWidth>
                    </CountryData>
                  ) : (
                    ""
                  )}
                </ContentSecurityMobile>
              ) : (
                ""
              )}
              {show === 2 ? (
                <MobileSpeedBlock>
                  <SpaceBetween>
                    <div>
                      <MobDiv>Best Block</MobDiv>
                      <DataMobDiv>
                        #{" "}
                        <NumberFormat
                          value={props.stats.bestBlock}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </DataMobDiv>
                    </div>
                    <div>
                      <MobDiv>Best Block Generated</MobDiv>
                      <DataMobDiv> {props.stats.lastBlock}</DataMobDiv>
                    </div>
                  </SpaceBetween>
                  <MobDiv>Avg Block Time</MobDiv>
                  <DataMobDiv>
                    {props.stats.avgBlock.toFixed(4) + " "}Sec
                  </DataMobDiv>
                  <MobileGraphDiv>
                    <LastBlockBar content={content} />
                  </MobileGraphDiv>
                  <DisplayFlex>
                    <FlexStyled>
                      Min &nbsp;<Span>1s</Span>
                    </FlexStyled>
                    <FlexStyledOne>
                      Max &nbsp;<Span>26s</Span>
                    </FlexStyledOne>
                  </DisplayFlex>
                </MobileSpeedBlock>
              ) : (
                ""
              )}
              {show === 3 ? (
                <MobileSpeedBlock>
                  <SpaceBetween>
                    <EfficiencyContentDiv>
                      <MobDiv>Avg Transaction Fee(USD)</MobDiv>
                      {
                        props.stats.bestBlock === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <div>
                                  <BestBlockData>{gasUsd}</BestBlockData>
                                  <EthDiv>
                                    <img src="/images/Down.svg" alt=" " />
                                    {" " + Eth} less than Ethereum
                                  </EthDiv>
                                </div>
                            )
                      }
                    </EfficiencyContentDiv>
                    <div>
                      <MobDiv>Up Time</MobDiv>
                      {
                        upTime === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <LastBLockData> {upTime}%</LastBLockData>
                            )
                      }
                    </div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>
                      <MobileAverageBlock>
                        Avg Transaction/Second
                      </MobileAverageBlock>
                      {
                        props.stats.avgRate === 0 ? (
                                <div className="animated-background"></div>
                            ) :
                            (
                                <DataMobDiv>
                                  {props.stats.avgRate.toFixed(2) + " "}TPS
                                </DataMobDiv>
                            )
                      }
                    </div>
                    <SelectionDiv>
                      <SelectionDivStyle
                        onClick={() => {
                          fetchTime(30);
                          setButtonToggle(1);
                        }}
                        buttonToggle={buttonToggle}
                      >
                        30D
                      </SelectionDivStyle>

                      <SelectionDivStyleTwo
                        buttonToggle={buttonToggle}
                        onClick={() => {
                          fetchTime(7);
                          setButtonToggle(2);
                        }}
                        style={{ borderRadius: "0px" }}
                      >
                        7D
                      </SelectionDivStyleTwo>
                      <SelectionDivStyleThree
                        buttonToggle={buttonToggle}
                        onClick={() => {
                          fetchTime(1);
                          setButtonToggle(3);
                        }}
                        style={{
                          borderRight: "none",
                          borderRadius: "0px 4px 4px 0px",
                        }}
                      >
                        24H
                      </SelectionDivStyleThree>
                    </SelectionDiv>
                  </SpaceBetween>
                  <MobileGraphDiv>
                  <UpTimeBar data={props?.stats?.efficiency}></UpTimeBar>
                  </MobileGraphDiv>
                </MobileSpeedBlock>
              ) : (
                ""
              )}
            </MobileContentParent>
          </MainContainer>
          <TableDiv>
            {showTable}
          </TableDiv>
          <Footer>© 2022 XDC Foundation. All Rights Reserved.</Footer>
        </>
      )}
    </Div>
  );
}



const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(Dashboard);
