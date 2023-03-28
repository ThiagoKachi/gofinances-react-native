import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Input } from ".";
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }: any) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe("Input", () => {
  it("should show specific border color when is active", () => {
    render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers
      }
    );

    const inputElement = screen.getByTestId("input-email");
    expect(inputElement.props.style[0].borderColor).toEqual(theme.colors.attention);
  });
});
