import "./App.css";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Page404 from "./components/Page404";
import Layout from "./layouts/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
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
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
