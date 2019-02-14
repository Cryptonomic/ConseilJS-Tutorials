import React from 'react';
import styled from 'styled-components';
import {openLinkToBlockExplorer} from '../../utils/general';

const OperationRow = styled.div`
  display: flex;
`;

const OperationTxt = styled.div`
  font-size: 16px;
  color: #000000;
`;

const Link = styled.div`
  margin-left: 12px;
  border-bottom: solid 1px #7ea3bd;
  font-size: 16px;
  color: #7ea3bd;
  cursor: pointer;
`;

const InjectOpLink = ({id}) => (
  <OperationRow>
    <OperationTxt>Injected Operation:</OperationTxt>
    <Link onClick={() => openLinkToBlockExplorer(id)}>{id}</Link>
  </OperationRow>
);

export default InjectOpLink;
