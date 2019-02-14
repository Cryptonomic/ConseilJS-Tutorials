import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  height: 73px;
  width: 100%;
  background-image: linear-gradient(to right, #bcfcff, #34386e);
`;

const LogoTxt = styled.div`
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 5.5px;
  color: #fffffe;
`;

const TutorialTxt = styled.div`
  font-size: 24px;
  letter-spacing: 2.6px;
  color: #fffffe;
`;

const Header = () => (
  <Container>
    <LogoTxt>CONSEIL JS</LogoTxt>
    <TutorialTxt>Tutorial 1</TutorialTxt>
  </Container>
);

export default Header;
