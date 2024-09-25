import "./App.css";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Page404 from "./components/Page404";
import Layout from "./layouts/Layout";
import DashBoard from "./components/DashBoard";
import Home from "./components/Home";
import About from "./components/About";
import TradingView from "./components/TradingView";
import NewsPage from "./pages/NewsPage";
import { useAppContext } from "./contexts/AppContext";
import Profile from "./components/Profile";
function App() {
  const { isLoggedIn } = useAppContext();
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
          path="/trading-view"
          element={
            <Layout>
              <div className="h-full">
                <TradingView />
              </div>
            </Layout>
          }
        />
        <Route
          path="/news"
          element={
            <Layout>
              <NewsPage />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout flag={"signin"}>
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
        {isLoggedIn && (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashBoard />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
          </>
        )}
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
