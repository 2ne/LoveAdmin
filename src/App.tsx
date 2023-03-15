import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./loveadmin/contact";
import SetupAccount from "./joinin/setup-account";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/SetupAccount" element={<SetupAccount />} />
        <Route path="*" element={<SetupAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
