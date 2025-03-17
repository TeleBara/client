import { lazy, createEffect } from "solid-js";
import { Route, Routes, Navigate } from "@solidjs/router";
import { useAuth } from "./store/auth";
import Layout from "./components/Layout";
import { JSX } from "solid-js/h/jsx-runtime";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));

export default function App(): JSX.Element {
  const { isAuthenticated, checkAuth } = useAuth();

  createEffect(() => {
    checkAuth();
  });

  return (
    <Layout>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route
          path="/"
          element={isAuthenticated() ? <Home /> : <Navigate href="/login" />}
        />
      </Routes>
    </Layout>
  );
}
