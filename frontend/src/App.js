import React from "react";
import Header from "./components/Header";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ViewExpense from "./screens/ViewExpense";
import Login from "./screens/Login";
import RegisterScreen from "./screens/RegisterScreen";
import Groups from "./screens/Groups";

const App = () => {
  return (
    <Router>
      <div className="header">
        <Header />
      </div>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/viewexpense" element={<ViewExpense />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
