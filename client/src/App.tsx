import React from "react"
import Body from "./components/Body"
import Login from "./pages/Login/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuestionSolve from "./pages/QuestionSolve";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/solve/:id",
        element: <QuestionSolve />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "/profile/:id",
        element: <Profile/>
      }
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
