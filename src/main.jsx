import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./routes/Home.jsx";
import Recipes from "./routes/Recipes.jsx";
import Recipe from "./routes/Recipe.jsx";
import Favorites from "./routes/Favorites.jsx";
import NotFound from "./routes/NotFound.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/recipes",
    element: <React.Suspense fallback={<div>Loading...</div>}><Recipes/></React.Suspense>
  },
  {
    path: "/recipes/:slug",
    element: <Recipe/>,
  },
  {
    path: "/favorites",
    element: <Favorites/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router}/>
  // </StrictMode>,
)
