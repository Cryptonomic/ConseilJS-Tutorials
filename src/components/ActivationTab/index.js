import React from 'react';
import styled from 'styled-components';
import CustomButton from '../CustomButton';
import InjectOpLink from '../InjectOpLink';

const Container = styled.div`
  width: 100%;
  padding: 34px 0 0 57px;
`;

const ActiveRow = styled.div`
  display: flex;
`;

const PkhCol = styled.div`
  margin-right: 85px;
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

const OperationContainer = styled.div`
  margin-top: 35px;
`;

const ErrorText = styled.div`
  color: #ff0000;
`;

const ActivationTab = (props) => {
  const { onClick, pkh, operationId, isAccountActive, error } = props;
  return (
    <Container>
      <ActiveRow>
        <PkhCol>
          <PkhTxt>Public Key Hash</PkhTxt>
          <PkhContext>{pkh}</PkhContext>
        </PkhCol>
        {(isAccountActive) ? (
          <CustomButton title='Account Active!' disabled={true} />
        ) : (error !== '') ?
        (
          <CustomButton title='Activate' disabled={true} />
        ) : (
          <CustomButton onClick={onClick} title='Activate' disabled={false} />
        )}
      </ActiveRow>
      {operationId &&
        <OperationContainer>
          <InjectOpLink id={operationId} />
        </OperationContainer>
      }
      <ErrorText>
        {error}
      </ErrorText>
    </Container>
  );
}


export default ActivationTab;
