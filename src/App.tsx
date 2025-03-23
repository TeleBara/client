import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import * as ReactRouter from "react-router-dom";
import { PreBuiltUIList } from "./config";


SuperTokens.init({
  appInfo: {
      appName: "TeleBara",
      apiDomain: "http://localhost:7070",
      websiteDomain: "http://localhost:1420",
      apiBasePath: "/auth/supertokens",
  },
  recipeList: [
      EmailPassword.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "email",
                label: "Email",
                placeholder: "Email address"
              },
              {
                id: "password",
                label: "Password",
                placeholder: "Password"
              },
              {
                id: "username",
                label: "Username",
                placeholder: "Choose a username"
              }
            ]
          },
          signInForm: {
            formFields: [
              {
                id: "email",
                label: "Email",
                placeholder: "Email address"
              },
              {
                id: "password",
                label: "Password",
                placeholder: "Password"
              }
            ]
          }
      }
    }),
    Session.init()
  ]
}); 

export default function App() {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

          <Route
            path="/"
            element={
              <SessionAuth>
                <HomePage />
              </SessionAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}
