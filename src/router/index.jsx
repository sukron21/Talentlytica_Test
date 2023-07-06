import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/home";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Index;
