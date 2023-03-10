import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

interface CategoryProps {
  isSelected: boolean;
}

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.1,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  padding: 16px;
`;

export const Category = styled.Text<CategoryProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, isSelected }) => (
    isSelected ? theme.colors.text_dark : theme.colors.text
  )};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;