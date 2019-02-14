import React from 'react';
import styled from 'styled-components';
import CustomButton from '../CustomButton';
import InjectOpLink from '../InjectOpLink';

const Container = styled.div`
  width: 100%;
  padding: 34px 0 0 57px;
`;

const RevealRow = styled.div`
  display: flex;
`;

const PkhCol = styled.div`
  margin-right: 30px;
`;

const PkhTxt = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #acacac;
`;

const PkhContext = styled.div`
  color: #acacac;
  font-size: 16px;
  line-height: 21px;
  border-bottom: solid 1px #979797;
  min-width: 360px;
`;

const FeeCol = styled.div`
  margin-right: 45px;
`;

const FeeTxt = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #acacac;
`;

const FeeContext = styled.div`
  color: #acacac;
  font-size: 16px;
  line-height: 21px;
  border-bottom: solid 1px #979797;
  min-width: 115px;
`;

const OperationContainer = styled.div`
  margin-top: 35px;
`;

const RevealTab = (props) => {
  const { onClick, pkh, operationId, isAccountRevealed } = props;
  return (
    <Container>
      <RevealRow>
        <PkhCol>
          <PkhTxt>Public Key Hash</PkhTxt>
          <PkhContext>{pkh}</PkhContext>
        </PkhCol>
        <FeeCol>
          <FeeTxt>Fee</FeeTxt>
          <FeeContext>0.001300</FeeContext>
        </FeeCol>
        { isAccountRevealed ? (
          <CustomButton title='Account Revealed!' disabled={true} />
        ) : (
          <CustomButton onClick={onClick} title='Reveal' disabled={false} />
        )}
      </RevealRow>
      {operationId &&
        <OperationContainer>
          <InjectOpLink id={operationId} />
        </OperationContainer>
      }
    </Container>
  );
}


export default RevealTab;
