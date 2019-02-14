import React from 'react';
import styled from 'styled-components';
import TezosIcon from '../TezosIcon';

const Container = styled.div`
  width: 175px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${({ isActive }) => isActive ? '#7ea3bd' : '#ffffff'};
  background-color: ${({ isActive}) => isActive ? '#ffffff' : '#7ea3bd'};
  cursor: pointer;
`;

const CheckIcon = styled(TezosIcon)`
  margin-left: 4px;
`;

const TabItem = ({title, isActive, isUnLocked, onClick}) => (
  <Container isActive={isActive} onClick={onClick}>
    {title}
    {isUnLocked && <CheckIcon size='20px' color='#77ff88' iconName='checkmark-outline' />}
  </Container>
);

export default TabItem;
