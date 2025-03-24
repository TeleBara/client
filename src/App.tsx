import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SuperTokensConfig } from "./config";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import * as ReactRouter from "react-router-dom";
import { AuthComponent } from "./components/AuthComponent";

SuperTokens.init(SuperTokensConfig);

export default function App() {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(ReactRouter, AuthComponent)}

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
