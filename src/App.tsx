import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./loveadmin/contact";
import SetupAccount from "./joinin/setup-account";
import InviteCreateAccount from "./joinin/invite-create-account";
import LoginJoinin from "./joinin/login";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/InviteCreateAccount" element={<InviteCreateAccount />} />
        <Route path="/SetupAccount" element={<SetupAccount />} />
        <Route path="/LoginJoinin" element={<LoginJoinin />} />
        <Route path="*" element={<InviteCreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
