import React from "react";
import Left from "./Home/LeftPart/Left";
import Right from "./Home/RightPart/Right";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

import { Navigate, Route, Routes } from "react-router-dom";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              // <div className="flex h-screen">
              //   <Left />
              //   <Right />
              // </div>
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />

                <div className="drawer-content flex flex-col items-center h-screen overflow-hidden text-base-content">
                  <div className="flex flex-col h-full w-full">
                    <Right />
                  </div>
                </div>
                
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                 <ul className="menu lg:w-[25em] md:w-[25em] sm:w-[22em] h-screen overflow-hidden bg-black text-base-content">
                  <Left />
                </ul>
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;