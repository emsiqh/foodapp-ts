import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "./containers";

function App() {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} replace={true} />} />
        <Route path="/home" element={<Main />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} /> */}
      </Routes>
    </div>
  );
}

export default App;
