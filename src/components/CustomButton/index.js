import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 52px;
  border-radius: 26px;
  background-color: #7ea3bd;
  color: #ffffff;
  font-size: 18px;
  outline: none;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? '0.5' : '1'};
`;

const CustomButton = ({title, disabled, onClick}) => (
  <Button onClick={onClick} disabled={disabled}>
    {title}
  </Button>
);

export default CustomButton;
