import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import PrivateRoute from "./private/privateRoute";
import Details from "./page/Details";
import Thread from "./page/Thread";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={PrivateRoute({ component: Dashboard })} />
        <Route path="/Details/:id" element={PrivateRoute({ component: Details })} />
        <Route path="/Thread" element={PrivateRoute({ component: Thread })} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
