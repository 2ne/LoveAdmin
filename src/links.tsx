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
            <Link to="/LoginJoinin">Login</Link>
          </li>
          <li>
            <Link to="/ResetPassword">Reset password</Link>
          </li>
          <li>
            <Link to="/SetNewPassword">Set new password</Link>
          </li>
          <li>
            <Link to="/InviteCreateAccount">Invite create account</Link>
          </li>
          <li>
            <Link to="/SetupAccount">Setup account</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="mb-2 font-medium">LoveAdmin</div>
        <ul className="space-y-1">
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
          <li>
            <Link to="/ProductSalesReport">Product Sales Report</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default LinksPage;
