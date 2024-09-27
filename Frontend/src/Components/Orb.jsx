import React from 'react';
import styled, { keyframes } from 'styled-components';


function Orb() {
  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #eae2e4 0%, #b2a192 100%);
    filter: blur(400px);
  `;

  return <OrbStyled />;
}

export default Orb;
