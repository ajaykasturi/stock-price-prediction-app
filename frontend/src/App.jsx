import "./App.css";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Page404 from "./components/Page404";
import Layout from "./layouts/Layout";
import DashBoard from "./components/DashBoard";
import Home from "./components/Home";
import About from "./components/About";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashBoard />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
