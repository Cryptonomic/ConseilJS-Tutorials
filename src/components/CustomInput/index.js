import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 53px;
  width: 100%;
  padding-top: 27px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 18px;
  line-height: 31px;
  color: #000000;
  outline: none;
  border: none;
  background-color: #fff;
  border-bottom: 1px solid #979797;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;

`;

const Label = styled.label`
  position: absolute;
  top: 27px;
  padding: 7px 0 0 0;
  transition: all 200ms;
  opacity: 0.5;
  display: inline-block;
  pointer-events: none;

  ${Input}:focus ~ & {
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
    opacity: 1;
  }

  ${Input}:valid ~ & {
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
    opacity: 1;
  }
`;


const CustomInput = ({label, type, value, valueKey, onChange}) => {
  return (
    <Container>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value, valueKey)} required />
      <Label>{label}</Label>
    </Container>
  )
};

CustomInput.defaultProps = {
  type: 'text',
  value: ''
}

export default CustomInput;
