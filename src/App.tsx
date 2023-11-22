import React, { ReactElement, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./loveadmin/contact/contact";
import SetupAccount from "./joinin/setup-account";
import InviteCreateAccount from "./joinin/invite-create-account";
import LoginJoinin from "./joinin/login";
import ResetPasswordJoinin from "./joinin/reset-password";
import LinksPage from "./links";
import SetNewPasswordJoinin from "./joinin/set-new-password";
import ProductSalesReport from "./loveadmin/reports/product-sales-report/product-sales-report";
import Contacts from "./loveadmin/contacts";
import DevProgrammeModal from "./loveadmin/dev-programme/dev-programme";
import SMS from "./loveadmin/settings/sms/layout";
import ChooseOrg from "./loveadmin/choose-org/choose-org";
import ShopSettings from "./loveadmin/shop-settings/shop-settings";
import ProductSettings from "./loveadmin/product-settings/product-settings";
import SMSReport from "./loveadmin/reports/communication-reports/sms-report";
import VoiceRecorder from "./loveadmin/dev-programme/voice-recorder";
import Home from "./loveadmin/tiles/home";
import Reports from "./loveadmin/tiles/reports";
import ReportsFinancials from "./loveadmin/tiles/reports-financials";
import ReportsFinancialsSales from "./loveadmin/tiles/reports-financials-sales";
import Sales from "./loveadmin/tiles/sales";
import Settings from "./loveadmin/tiles/settings";
import SettingsOrganisation from "./loveadmin/tiles/settings-organiation";
import SettingsOrganisationProviders from "./loveadmin/tiles/settings-organisation-providers";
import SettingsCommunication from "./loveadmin/tiles/settings-communication";
import SettingsData from "./loveadmin/tiles/settings-data";
import SettingsLearning from "./loveadmin/tiles/settings-learning";
import ReportsCommunication from "./loveadmin/tiles/reports-communication";
import ReportsInvitations from "./loveadmin/tiles/reports-invitations";
import Navigation from "./components/navigation";
import Dashboard from "./loveadmin/dashboard/dashboard";
import Timetable from "./loveadmin/timetable/timetable";
import getScrollBarWidth from "./components/useScrollBarWidth";

function App(): ReactElement {
  useEffect(() => {
    getScrollBarWidth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Timetable" element={<Timetable />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Reports/Financials" element={<ReportsFinancials />} />
        <Route
          path="/Reports/Financials/Sales"
          element={<ReportsFinancialsSales />}
        />
        <Route
          path="/Reports/Communication"
          element={<ReportsCommunication />}
        />
        <Route path="/Reports/Communication/SMS" element={<SMSReport />} />
        <Route path="/Reports/Invitations" element={<ReportsInvitations />} />
        <Route path="/Sales" element={<Sales />} />
        <Route path="/Settings" element={<Settings />} />
        <Route
          path="/Settings/Organisation"
          element={<SettingsOrganisation />}
        />
        <Route
          path="/Settings/Organisation/PaymentProviders"
          element={<SettingsOrganisationProviders />}
        />
        <Route
          path="/Settings/Communication"
          element={<SettingsCommunication />}
        />
        <Route path="/Settings/Communication/SMS" element={<SMS />} />
        <Route path="/Settings/Data" element={<SettingsData />} />
        <Route path="/Settings/Learning" element={<SettingsLearning />} />
        <Route path="/ChooseOrg" element={<ChooseOrg />} />
        <Route path="/ShopSettings" element={<ShopSettings />} />
        <Route path="/Settings/Products" element={<ProductSettings />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route
          path="/Reports/Financials/Sales/Products"
          element={<ProductSalesReport />}
        />
        <Route path="/DevProgramme" element={<DevProgrammeModal />} />
        <Route path="/VoiceRecorder" element={<VoiceRecorder />} />
        <Route path="/InviteCreateAccount" element={<InviteCreateAccount />} />
        <Route path="/SetupAccount" element={<SetupAccount />} />
        <Route path="/LoginJoinin" element={<LoginJoinin />} />
        <Route path="/ResetPassword" element={<ResetPasswordJoinin />} />
        <Route path="/SetNewPassword" element={<SetNewPasswordJoinin />} />
        <Route path="*" element={<LinksPage />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
