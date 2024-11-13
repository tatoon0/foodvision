import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  width?: string;
  height?: string;
  marginBottom?: string;
  marginTop?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  onPress: () => void;
  children: React.ReactNode;
}

export default function CustomButton(props: ButtonProps) {
  return (
    <StyledTouchable {...props} onPress={props.onPress}>
      <ButtonText textColor={props.textColor}>{props.children}</ButtonText>
    </StyledTouchable>
  );
}

const StyledTouchable = styled(TouchableOpacity)<ButtonProps>`
  width: ${(props) => props.width || '290px'};
  height: ${(props) => props.height || '45px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  background-color: ${(props) => props.backgroundColor || '#5370d4'};
  padding: ${(props) => props.padding || '0px'};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)<{ textColor?: string }>`
  color: ${(props) => props.textColor || 'white'};
  font-size: 15px;
  font-weight: 500;
  text-align: center;
`;