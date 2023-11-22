import React, { ReactElement } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

function LinksPage(): ReactElement {
  return (
    <Layout className="min-h-screen p-12 space-y-6">
      <div>
        <div className="mb-2 font-medium">JoinIn</div>
        <ul className="space-y-1">
          <li>
            <Link to="/LoginJoinin" className="">
              Login
            </Link>
          </li>
          <li>
            <Link to="/ResetPassword" className="">
              Reset password
            </Link>
          </li>
          <li>
            <Link to="/SetNewPassword" className="">
              Set new password
            </Link>
          </li>
          <li>
            <Link to="/InviteCreateAccount" className="">
              Invite create account
            </Link>
          </li>
          <li>
            <Link to="/SetupAccount" className="">
              Setup account
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="mb-2 font-medium">LoveAdmin</div>
        <ul className="space-y-1">
          <li>
            <Link to="/Home" className="">
              Home
            </Link>
          </li>
          <li>
            <Link to="/ChooseOrg" className="">
              Choose organisation
            </Link>
          </li>
          <li>
            <Link to="/Contact" className="">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/Contacts" className="">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/Reports/Financials/Sales/Products" className="">
              Product Sales Report
            </Link>
          </li>
          <li>
            <Link to="/Reports/Communication/SMS" className="">
              SMS Report
            </Link>
          </li>
          <li>
            <Link to="/DevProgramme" className="">
              Development Programme
            </Link>
          </li>
          <li>
            <Link to="/VoiceRecorder" className="">
              Voice Recorder
            </Link>
          </li>
          <li>
            <Link to="/Settings/Communication/SMS" className="">
              SMS Settings
            </Link>
          </li>
          <li>
            <Link to="/ShopSettings" className="">
              Shop Settings
            </Link>
          </li>
          <li>
            <Link to="/ProductSettings" className="">
              Product Settings
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default LinksPage;
