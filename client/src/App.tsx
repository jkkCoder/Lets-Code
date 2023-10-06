import React from "react"
import './App.css';
import Body from "./components/Body"
import Login from "./pages/Login/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuestionSolve from "./pages/QuestionSolve";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { store } from "./redux/store";
import {Provider} from "react-redux"
import CategoryId from "./pages/CategoryId";

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
        path: "/category/:id",
        element: <CategoryId />
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
