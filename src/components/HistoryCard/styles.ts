import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 14px 24px;

  border-radius: 6px;
  border-left-width: 6px;
  border-left-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-style: ${RFValue(16)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-style: ${RFValue(16)}px;
`;
