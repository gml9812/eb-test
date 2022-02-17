import styled from 'styled-components';

export const SuggestedItem = styled.li<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? 'red' : 'black')};
  background: ${(props) => (props.isActive ? '#808080' : '#d3d3d3')};
  cursor: pointer;
  font-weight: 700;
`;
