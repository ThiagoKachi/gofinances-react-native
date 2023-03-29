import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import { Register } from '.';
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

jest.mock('expo-apple-authentication', () => {});
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  }
})

describe('Register', () => {
  it('should open category modal when user click on category button', async () => {
    render(<Register />, { wrapper: Providers });

    const categoryButton = screen.getByTestId('button-category');
    const categoryModal = screen.getByTestId('modal-category');
    
    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});