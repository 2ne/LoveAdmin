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
import DevProgrammeModal from "./loveadmin/dev-programme/dev-programme";
import SMSMessagingLayout from "./loveadmin/settings/sms-messaging/layout";
import ChooseOrg from "./loveadmin/choose-org/choose-org";
import ShopSettings from "./loveadmin/shop-settings/shop-settings";
import ProductSettings from "./loveadmin/product-settings/product-settings";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ChooseOrg" element={<ChooseOrg />} />
        <Route path="/SMSSettings" element={<SMSMessagingLayout />} />
        <Route path="/ShopSettings" element={<ShopSettings />} />
        <Route path="/ProductSettings" element={<ProductSettings />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/ProductSalesReport" element={<ProductSalesReport />} />
        <Route path="/DevProgramme" element={<DevProgrammeModal />} />
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
