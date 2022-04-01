import React from "react";
import styled from "styled-components";

const BackDropStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  top: 0;
  right: 0;
`;

export default function BackDrop() {
  return <BackDropStyle></BackDropStyle>;
}
