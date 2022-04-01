import React from "react";
import styled from "styled-components";

const Div = styled.div`
  height: 100%;
  max-width: 336px;
  background-color: #102e84;
  width: 100%;
  color: white;
  position: fixed;
  z-index: 200;
  padding: 16px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
    max-width: 200px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavLabel = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
  display: flex;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #4666c4;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const Content = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap");
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  font-family: "Inter", Medium;
  font-weight: 500;
  cursor: pointer;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const CloseImg = styled.img`
  cursor: pointer;
`;

const RowDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #4867c1;
  height: 56px;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 50px;
`;
export default function SideDrawer(props) {
  return (
    <Div>
      <ColumnDiv>
        <Nav>
          <NavLabel>Browse</NavLabel>

          <CloseImg
            src="/images/Group 60.svg"
            alt="close"
            onClick={() => props.setShowSideDrop(false)}
          />
        </Nav>
        <ColumnContainer>

        <RowDiv>
            <Content
              onClick={() =>
                window.open("https://observer.xdc.org/")
              }
            >
              XDC Observatory
            </Content>
          </RowDiv>

          <RowDiv>
            <Content
              onClick={() =>
                window.open("https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo?hl=en-US")
              }
            >
              XDCPay
            </Content>
          </RowDiv>

          <RowDiv>
            <Content
              onClick={() =>
                window.open("https://github.com/xdcfoundation")
              }
            >
              XDC GitHub
            </Content>
          </RowDiv>

          <RowDiv>
            <Content
              onClick={() =>
                window.open("https://xdcroadmap.org/")
              }
            >
              XDC Roadmap
            </Content>
          </RowDiv>

          <RowDiv>
            <Content
              onClick={() =>
                window.open("https://medium.com/xdc-foundation-communications")
              }
            >
              About XDC
            </Content>
          </RowDiv>
        </ColumnContainer>
      </ColumnDiv>
    </Div>
  );
}
