import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import About from "./routes/About";
import AboutAuthor from "./routes/AboutAuthor";
import MainLayout from "./layouts/MainLayout";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Verify from "./routes/Verify";

import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { lookInSession } from "./common/session";
import ResetPassword from "./routes/ResetPassword";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({ token: null }); // Initialize as object

  useEffect(() => {
    const userInSession = lookInSession("User");

    setUserAuth(userInSession ? JSON.parse(userInSession) : { token: null }); // Set the object directly

    // or, for safer updates (if object might be mutated directly):
    //setUserAuth(userInSession ? { ...userInSession } : { access_token: null });
  }, []);

  const value = {
    userAuth,
    setUserAuth, // Include setUserAuth in the context, for updating authentication status
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const App = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/aboutauthor",
          element: <AboutAuthor />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verify",
          element: <Verify />,
        },
        {
          path: "/reset",
          element: <ResetPassword />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
