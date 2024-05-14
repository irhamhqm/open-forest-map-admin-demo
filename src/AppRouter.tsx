import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import App from "./App";
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
            path="/main-map"
            element={<App />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
