import React from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 35px;
`;

const Col = styled.div`
  width: ${({ isLeft }) => isLeft ? '40%' : '55%'};
`;

const SubmitBtn = styled.input`
  height: 54px;
  width: 146px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #7ea3bd;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  margin: 6px 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  outline: none;
`;

const ErrorText = styled.div`
  color: #ff0000;
`;

const FundraiserTab = (props) => {

  const {mnemonic, password, pkh, email, secret, isUnlocked, onInputChange, error} = props;
  const isActive = mnemonic && password && pkh && email && secret && !isUnlocked;

  return (
    <React.Fragment>
      <Row>
        <CustomInput
          value={mnemonic}
          valueKey='mnemonic'
          label="Mnemonic"
          onChange={onInputChange}
        />
      </Row>
      <Row>
        <Col isLeft>
          <CustomInput
            value={password}
            valueKey='password'
            type="password"
            label="Password"
            onChange={onInputChange}
          />
        </Col>
        <Col>
          <CustomInput
            value={pkh}
            valueKey='pkh'
            label="Public Key Hash"
            onChange={onInputChange}
          />
        </Col>
      </Row>
      <Row>
        <Col isLeft>
          <CustomInput
            value={email}
            valueKey='email'
            label="Email"
            onChange={onInputChange}
          />
        </Col>
        <Col>
          <CustomInput
            value={secret}
            valueKey='secret'
            label="Secret"
            onChange={onInputChange}
          />
        </Col>
      </Row>
      <Row>
        <SubmitBtn type="submit" disabled={!isActive} value="Unlock" />
      </Row>
      <Row>
        <ErrorText>
          {error}
        </ErrorText>
      </Row>
    </React.Fragment>
  );
}


export default FundraiserTab;
