/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
// import { AuthProvider } from "./store/auth";
import App from "./App";

render(
  () => (
    // <AuthProvider>
    <Router>
      <App />
    </Router>
    // </AuthProvider>
  ),
  document.getElementById("root") as HTMLElement,
);
