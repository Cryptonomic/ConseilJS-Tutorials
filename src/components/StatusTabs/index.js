import React from 'react';
import styled from 'styled-components';
import TabItem from '../TabItem';

const Container = styled.div`
  width: 100%;
  height: 62px;
  background-color: #7ea3bd;
  opacity: ${({ isLocked }) => isLocked ? 0.7 : 1};
  padding-top: 17px;
  display: flex;
  margin-top: 58px;
  pointer-events: ${({ isLocked }) => isLocked ? 'none' : 'auto'};
`;

const tabsList = ['Activate', 'Reveal', 'Send'];

const StatusTabs = ({activeTab, activatedTabsCount, setActiveTab}) => (
  <Container isLocked={activatedTabsCount===0}>
    {tabsList.map((item, index) => {
      if (activatedTabsCount!==0 && index > activatedTabsCount - 1) {
        return null;
      }
      const isActive = index === activeTab;
      return (
        <TabItem
          key={index}
          title={item}
          isActive={isActive}
          isUnLocked={index < activatedTabsCount - 1}
          onClick={()=> setActiveTab(index)}
        />
      );
    })}
  </Container>
);

export default StatusTabs;
