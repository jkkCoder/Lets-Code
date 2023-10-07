import React from "react"
import './App.css';
import Body from "./components/Body"
import Login from "./pages/Login/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuestionSolve from "./pages/QuestionSolve";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
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
