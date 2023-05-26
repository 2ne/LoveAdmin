import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./loveadmin/contact/contact";
import SetupAccount from "./joinin/setup-account";
import InviteCreateAccount from "./joinin/invite-create-account";
import LoginJoinin from "./joinin/login";
import ResetPasswordJoinin from "./joinin/reset-password";
import LinksPage from "./links";
import SetNewPasswordJoinin from "./joinin/set-new-password";
import ProductSalesReport from "./loveadmin/product-sales-report";
import Contacts from "./loveadmin/contacts";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/ProductSalesReport" element={<ProductSalesReport />} />
        <Route path="/InviteCreateAccount" element={<InviteCreateAccount />} />
        <Route path="/SetupAccount" element={<SetupAccount />} />
        <Route path="/LoginJoinin" element={<LoginJoinin />} />
        <Route path="/ResetPassword" element={<ResetPasswordJoinin />} />
        <Route path="/SetNewPassword" element={<SetNewPasswordJoinin />} />
        <Route path="*" element={<LinksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
