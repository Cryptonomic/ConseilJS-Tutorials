import React from 'react';
import styled from 'styled-components';
import CustomButton from '../CustomButton';
import InjectOpLink from '../InjectOpLink';
import CustomInput from '../../components/CustomInput';

const Container = styled.div`
  width: 100%;
  padding: 34px 57px 0 57px;
`;

const SendRow = styled.div`
  display: flex;
`;

const FromCol = styled.div`
  margin-right: 30px;
`;

const FromTxt = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #acacac;
`;

const FromContext = styled.div`
  color: #acacac;
  font-size: 16px;
  line-height: 21px;
  border-bottom: solid 1px #979797;
  min-width: 400px;
`;

const BalanceCol = styled.div`
  margin-right: 45px;
`;

const BalanceTxt = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #acacac;
`;

const BalanceContext = styled.div`
  color: #acacac;
  font-size: 16px;
  line-height: 21px;
  border-bottom: solid 1px #979797;
  min-width: 210px;
`;

const SendRow2 = styled.div`
  display: flex;
  margin-top: 42px;
  max-width: 640px;
`;

const SendRow3 = styled.div`
  display: flex;
  margin-top: 50px;
  max-width: 640px;
`;

const AmountContainer = styled.span`
  margin-right: 30px;
`;

const FeeCol = styled.div`
  margin-right: 50px;
  margin-top: 20px;
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
  min-width: 180px;
`;

const ButtonContainer = styled.span`
  margin-top: 10px;
`;

const OperationContainer = styled.div`
  margin-top: 35px;
  margin-bottom: 35px;
`;

const NewContainer = styled.div`
  display: flex;
  margin-top: 23px;
  justify-content: flex-end;
  max-width: 640px;
  padding-right: 20px;
`;

const NewButton = styled.div`
  color: #7ea3bd;
  font-size: 16px;
  pointer: focus;
`;

const NewTxt = styled.span`
  margin-left: 4px;
  cursor: pointer;
`;


const SendTab = (props) => {

  const {pkh, balance, onClick, destination, amount, operationId, onInputChange, addTransaction} = props;
  return (
    <Container>
      <SendRow>
        <FromCol>
          <FromTxt>From</FromTxt>
          <FromContext>{pkh}</FromContext>
        </FromCol>
        <BalanceCol>
          <BalanceTxt>Available Balance</BalanceTxt>
          <BalanceContext>{balance}</BalanceContext>
        </BalanceCol>
      </SendRow>

      <SendRow2>
        <CustomInput
          value={destination}
          valueKey='destination'
          label="Destination"
          onChange={onInputChange}
        />
      </SendRow2>

      <SendRow3>
        <AmountContainer>
          <CustomInput
            value={amount}
            valueKey='amount'
            label="Amount"
            type='number'
            onChange={onInputChange}
          />
        </AmountContainer>
        <FeeCol>
          <FeeTxt>Fee</FeeTxt>
          <FeeContext>0.001420</FeeContext>
        </FeeCol>
        <ButtonContainer>
          <CustomButton title='Send' onClick={onClick} disabled={!!operationId} />
        </ButtonContainer>
      </SendRow3>

      {operationId &&
        <OperationContainer>
          <InjectOpLink id={operationId} />
        </OperationContainer>
      }
      {operationId &&
        <NewContainer>
          <NewButton onClick={addTransaction}>
            <i className="fa fa-refresh" aria-hidden="true" />
            <NewTxt>New Transaction</NewTxt>
          </NewButton>
        </NewContainer>
      }
    </Container>
  );
}

export default SendTab;
