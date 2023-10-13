import React from "react";
import { render, screen } from "@testing-library/react-native";
import LoginScreen from "../src/Views/Login/LoginScreen";
import { Provider } from "react-redux";
import store from "../Redux/store";

describe("LoginScreen Component", () => {
  it("should render the login screen correctly", () => {
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Kullanıcı adı");
    const passwordInput = screen.getByPlaceholderText("Şifre");
    const loginButton = screen.getByText("Giriş Yap");

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });
});
