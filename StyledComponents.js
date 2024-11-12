// StyledComponents.js
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const StyledText = styled.Text`
  font-family: 'Pretendard';
  color: ${(props) => props.theme.colors.text}; // 테마에서 빨간색 적용
  font-size: 16px;
`;
