import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import App from "./pages/map";
import DataPage from "./pages/data";
import ProgramPage from "./pages/data/program";
import SoilTypePage from "./pages/data/soilType";
import RegulationPage from "./pages/data/regulation";
import FireEventDetailPage from "./pages/data/fireEventDetail";
import SoilTypeDetailPage from "./pages/data/soilTypeDetail";
import RegulationDetailPage from "./pages/data/regulationDetail";
import ProgramDetailPage from "./pages/data/programDetail";
import ForgotPassword from "./pages/forgot_password";
import ResetPassword from "./pages/reset_password";
// import { useState } from 'react'

function AppRouter() {
  //   const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signin"
            element={<SignIn />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/map"
            element={<App />}
          />
          <Route
            path="/data"
            element={<DataPage />}
          />
          <Route
            path="/data/fire-event/:id"
            element={<FireEventDetailPage />}
          />
          <Route
            path="/data/soil-type"
            element={<SoilTypePage />}
          />
          <Route
            path="/data/soil-type/:id"
            element={<SoilTypeDetailPage />}
          />
          <Route
            path="/data/regulation"
            element={<RegulationPage />}
          />
          <Route
            path="/data/regulation/:id"
            element={<RegulationDetailPage />}
          />
          <Route
            path="/data/program"
            element={<ProgramPage />}
          />
          <Route
            path="/data/program/:id"
            element={<ProgramDetailPage />}
          />
          <Route
            path="/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
