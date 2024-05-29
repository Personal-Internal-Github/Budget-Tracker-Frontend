import React from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
// import IncomePage from "./pages/IncomePage";
// import ExpensePage from "./pages/ExpensePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  // {
  //   path: '/income',
  //   element: <IncomePage/>
  // },
  // {
  //   path: '/expense',
  //   element: <ExpensePage/>
  // }
])

function App() {

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage/>}/>
    //     <Route exact path="/income" />
    //     <Route exact path="/expense" element={<ExpensePage/>}/>
    //   </Routes>
    // </Router>
    // <RouterProvider router={router}/>
    <HomePage/>
  )
}

export default App;
