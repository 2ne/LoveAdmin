export const navigationLinks = [
  {
    name: "Dashboard",
    href: "/Dashboard",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.75 6.75a2 2 0 012-2h10.5a2 2 0 012 2v10.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2V6.75zM9.75 8.75V19M5 8.25h14"
        ></path>
      </svg>
    ),
    key: "dashboard",
  },
  {
    name: "Teams",
    href: "/Teams",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.25 5.75H5.75a1 1 0 00-1 1v10.5a1 1 0 001 1h12.5a1 1 0 001-1V6.75a1 1 0 00-1-1z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 9.75h2.25v4.5H5M12 6v3.5M12 15v3M14.25 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM19.25 9.75h-2.5v4.5h2.5"
        ></path>
      </svg>
    ),
    key: "teams",
  },
  {
    name: "Timetable",
    href: "/Timetable",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
        ></path>
      </svg>
    ),
    key: "timetable",
  },
  {
    name: "Reports",
    tileLink: "/Reports",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.5 16.25H6.75a2 2 0 01-2-2v-7.5a2 2 0 012-2h10.5a2 2 0 012 2v7.5a2 2 0 01-2 2H13.5m-3 0l-1.75 3m1.75-3h3m0 0l1.75 3m-6.5-7v-3.5m3.25 3.5v-2.5m3.25 2.5v-1.5"
        ></path>
      </svg>
    ),
    key: "reports",
    children: [
      {
        name: "Financials",
        tileLink: "/Reports/Financials",
        key: "financials",
        children: [
          {
            name: "Sales Reports",
            tileLink: "/Reports/Financials/Sales",
            key: "salesReports",
            children: [
              {
                name: "Product Sales",
                href: "/Reports/Financials/Sales/Products",
                key: "Products",
              },
              { name: "Sales Invoice", href: "#", key: "salesInvoice" },
              { name: "Sales Settlement", href: "#", key: "salesSettlement" },
            ],
          },
          { name: "Refunds", href: "#", key: "refunds" },
          { name: "Tax", href: "#", key: "tax" },
          { name: "Transaction Fees", href: "#", key: "transactionFees" },
          { name: "Reconciliation", href: "#", key: "reconciliation" },
          { name: "Statement", href: "#", key: "statement" },
          { name: "Disputes", href: "#", key: "disputes" },
          { name: "Aged Receivable", href: "#", key: "agedReceivable" },
          { name: "Pending Payment", href: "#", key: "pendingPayment" },
          { name: "Best Sellers", href: "#", key: "bestSellers" },
          {
            name: "Customer Mandate Status",
            href: "#",
            key: "customerMandateStatus",
          },
        ],
      },
      {
        name: "Communication",
        tileLink: "/Reports/Communication",
        key: "communicationReports",
        children: [
          { name: "Scheduled", href: "#", key: "scheduled" },
          { name: "Email History", href: "#", key: "emailHistory" },
          {
            name: "SMS History",
            href: "/Reports/Communication/SMS",
            key: "smsHistory",
          },
        ],
      },
      {
        name: "Invitations",
        tileLink: "/Reports/Invitations",
        key: "invitations",
        children: [
          { name: "Organisation", href: "#", key: "invitationsOrganisation" },
          { name: "Product", href: "#", key: "product" },
        ],
      },
      { name: "New Customers", href: "#", key: "newCustomers" },
      { name: "Renewals", href: "#", key: "renewals" },
      { name: "Subscriptions", href: "#", key: "subscriptions" },
      { name: "Attendance", href: "#", key: "attendance" },
      {
        name: "Conditions of sale",
        href: "/Reports/ConditionsOfSale",
        key: "ConditionsOfSale",
      },
      {
        name: "Enquiries",
        href: "/Reports/Enquiries",
        key: "Enquiries",
      },
    ],
  },
  {
    name: "Sales admin",
    tileLink: "/Sales",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
        ></path>
      </svg>
    ),
    key: "sales",
    children: [
      { name: "Orders", href: "#", key: "orders" },
      { name: "Invoices", href: "#", key: "invoices" },
      { name: "Payments", href: "#", key: "payments" },
      { name: "Abandoned Checkout", href: "#", key: "abandonedCheckout" },
    ],
  },
  {
    name: "Contacts",
    href: "/Contacts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16.75 4.75h1.5a1 1 0 0 1 1 1v2.5m-2.5-3.5h-9a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h9m0-14.5v3.5m0 11h1.5a1 1 0 0 0 1-1v-2.5m-2.5 3.5v-3.5m0-7.5h2.5m-2.5 0V12m2.5-3.75V12m-2.5 3.75h2.5m-2.5 0V12m2.5 3.75V12m-2.5 0h2.5m-10.5 3.25s.675-1.5 2.25-1.5 2.25 1.5 2.25 1.5m-1-5.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
        ></path>
      </svg>
    ),
    key: "contacts",
  },
  {
    name: "Settings",
    tileLink: "/Settings",
    colour: "secondary",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5.621 14.963l1.101.172c.813.127 1.393.872 1.333 1.71l-.081 1.137a.811.811 0 00.445.787l.814.4c.292.145.641.09.88-.134l.818-.773a1.55 1.55 0 012.138 0l.818.773a.776.776 0 00.88.135l.815-.402a.808.808 0 00.443-.785l-.08-1.138c-.06-.838.52-1.583 1.332-1.71l1.101-.172a.798.798 0 00.651-.62l.201-.9a.816.816 0 00-.324-.847l-.918-.643a1.634 1.634 0 01-.476-2.132l.555-.988a.824.824 0 00-.068-.907l-.563-.723a.78.78 0 00-.85-.269l-1.064.334a1.567 1.567 0 01-1.928-.949l-.407-1.058a.791.791 0 00-.737-.511l-.903.002a.791.791 0 00-.734.516l-.398 1.045a1.566 1.566 0 01-1.93.956l-1.11-.348a.78.78 0 00-.851.27l-.56.724a.823.823 0 00-.062.91l.568.99c.418.73.213 1.666-.469 2.144l-.907.636a.817.817 0 00-.324.847l.2.9c.072.325.33.57.651.62z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.591 10.409a2.25 2.25 0 11-3.183 3.182 2.25 2.25 0 013.183-3.182z"
        ></path>
      </svg>
    ),
    key: "settings",
    children: [
      {
        name: "Organisation",
        tileLink: "/Settings/Organisation",
        tileIcon: (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.75 19.25h10.5a2 2 0 002-2v-7.5l-7.25-5-7.25 5v7.5a2 2 0 002 2z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 15.75a2 2 0 012-2h.5a2 2 0 012 2v3.5h-4.5v-3.5z"
            ></path>
          </svg>
        ),
        colour: "secondary",
        key: "organisationSettings",
        children: [
          { name: "Details", colour: "secondary", href: "#", key: "details" },
          {
            name: "Accounting & Billing",
            colour: "secondary",
            href: "#",
            key: "accountingBilling",
          },
          {
            name: "Discounts",
            colour: "secondary",
            href: "#",
            key: "discounts",
          },
          {
            name: "Membership Card",
            colour: "secondary",
            href: "#",
            key: "membershipCards",
          },
          {
            name: "Address Book",
            colour: "secondary",
            href: "#",
            key: "addressBook",
          },
          {
            name: "Payment Providers",
            colour: "secondary",
            tileLink: "/Settings/Organisation/PaymentProviders",
            key: "paymentProviders",
            children: [
              {
                name: "GoCardless",
                colour: "secondary",
                href: "#",
                key: "goCardless",
              },
              {
                name: "London & Zurich",
                colour: "secondary",
                href: "#",
                key: "londonZurich",
              },
              { name: "PayPal", colour: "secondary", href: "#", key: "paypal" },
            ],
          },
          { name: "Colours", colour: "secondary", href: "#", key: "colours" },
          {
            name: "Shop Tiles",
            colour: "secondary",
            href: "#",
            key: "shopTiles",
          },
          {
            name: "Enquiry Form",
            colour: "secondary",
            href: "/Settings/Organisation/EnquiryForm",
            key: "enquiryForm",
          },
        ],
      },
      {
        name: "Products",
        tileLink: "/Settings/Products",
        tileIcon: (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7.75 7.75h11.5l-1.637 6.958a2 2 0 01-1.947 1.542h-4.127a2 2 0 01-1.933-1.488L7.75 7.75zm0 0l-.75-3H4.75"
            ></path>
            <circle cx="10" cy="19" r="1" fill="currentColor"></circle>
            <circle cx="17" cy="19" r="1" fill="currentColor"></circle>
          </svg>
        ),
        href: "/Settings/Products",
        colour: "secondary",
        key: "products",
      },
      {
        name: "Schedule",
        tileIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.25 9.25v-.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h2.5m5.75-5.5V15l1.25 1.25M8 4.75v3.5m8-3.5v3.5m-1 11a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5Z"
            ></path>
          </svg>
        ),
        href: "#",
        colour: "secondary",
        key: "schedule",
      },
      {
        name: "Communication",
        tileIcon: (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z"
            ></path>
          </svg>
        ),
        tileLink: "/Settings/Communication",
        colour: "secondary",
        key: "communicationSettings",
        children: [
          {
            name: "Email Templates",
            href: "#",
            colour: "secondary",
            key: "emailTemplates",
          },
          {
            name: "SMS",
            href: "/Settings/Communication/SMS",
            colour: "secondary",
            key: "sms",
          },
        ],
      },
      {
        name: "Data",
        tileIcon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M9.25 9.25V6.75C9.25 6.19772 8.80228 5.75 8.25 5.75H5.75C5.19772 5.75 4.75 6.19772 4.75 6.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25H8.25C8.80228 10.25 9.25 9.80228 9.25 9.25Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9.25 18.25H5.75C5.19772 18.25 4.75 17.8023 4.75 17.25V13.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.75 6.75H19.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.75 14.75H19.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.75 9.25H19.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.75 17.25H19.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M8 16.25L7.42383 16.7301C7.59297 16.9331 7.85641 17.0321 8.11735 16.9908C8.37829 16.9494 8.59824 16.7738 8.69636 16.5285L8 16.25ZM10.8011 13.2587C11.0821 12.9543 11.0631 12.4799 10.7587 12.1989C10.4543 11.9179 9.97985 11.9369 9.6989 12.2413L10.8011 13.2587ZM7.32617 14.2699C7.06099 13.9517 6.58807 13.9087 6.26986 14.1738C5.95165 14.439 5.90866 14.9119 6.17383 15.2301L7.32617 14.2699ZM8.69636 16.5285C9.03866 15.6728 9.56133 14.855 10.0115 14.2398C10.2345 13.9351 10.4349 13.6865 10.5785 13.5152C10.6503 13.4296 10.7076 13.3637 10.7462 13.32C10.7655 13.2981 10.7801 13.2819 10.7894 13.2716C10.7941 13.2664 10.7974 13.2627 10.7994 13.2606C10.8004 13.2595 10.801 13.2588 10.8013 13.2585C10.8015 13.2583 10.8015 13.2583 10.8015 13.2583C10.8015 13.2583 10.8014 13.2584 10.8014 13.2584C10.8013 13.2585 10.8013 13.2585 10.8012 13.2586C10.8012 13.2586 10.8011 13.2587 10.25 12.75C9.6989 12.2413 9.69881 12.2414 9.69872 12.2415C9.69868 12.2415 9.69858 12.2416 9.6985 12.2417C9.69835 12.2419 9.69817 12.2421 9.69797 12.2423C9.69757 12.2427 9.69708 12.2433 9.6965 12.2439C9.69534 12.2452 9.69382 12.2468 9.69194 12.2489C9.68819 12.253 9.68303 12.2587 9.67653 12.2658C9.66352 12.2802 9.64515 12.3007 9.62195 12.327C9.57558 12.3795 9.50986 12.4551 9.42926 12.5512C9.26825 12.7432 9.04679 13.0181 8.80098 13.354C8.31367 14.02 7.71134 14.9522 7.30364 15.9715L8.69636 16.5285ZM6.17383 15.2301L7.42383 16.7301L8.57617 15.7699L7.32617 14.2699L6.17383 15.2301Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
        tileLink: "/Settings/Data",
        colour: "secondary",
        key: "data",
        children: [
          {
            name: "Forms",
            colour: "secondary",
            tileLink: "/Settings/Data/Forms",
            key: "forms",
            children: [
              {
                name: "Customer Forms",
                href: "/Settings/Data/Forms/CustomerForms",
                colour: "secondary",
                key: "customerForms",
              },
              {
                name: "Internal Contact Data",
                href: "/Settings/Data/Forms/InternalContactForms",
                colour: "secondary",
                key: "internalContactForms",
              },
              {
                name: "Product Data",
                href: "/Settings/Data/Forms/InternalContactForms",
                colour: "secondary",
                key: "internalContactForms",
              },
              {
                name: "Manage Fields",
                href: "/Settings/Data/Forms/ManageFields",
                colour: "secondary",
                key: "manageFields",
              },
            ],
          },
          { name: "Consents", href: "#", colour: "secondary", key: "consents" },
          {
            name: "Import Data",
            href: "#",
            colour: "secondary",
            key: "import",
          },
        ],
      },
      {
        name: "Files",
        tileIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 6.75h-3a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-5m-5.5-5.5 5.5 5.5m-5.5-5.5v3.5a2 2 0 0 0 2 2h3.5m-3.5-7.5h2l5.5 5.5v5a2 2 0 0 1-2 2H15.5"
            ></path>
          </svg>
        ),
        href: "#",
        colour: "secondary",
        key: "files",
      },
      {
        name: "Groups",
        tileIcon: (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"
            ></path>
            <circle
              cx="9.5"
              cy="7.5"
              r="2.75"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"
            ></path>
          </svg>
        ),
        href: "/Settings/Groups",
        colour: "secondary",
        key: "groups",
      },
      {
        name: "Learning",
        tileIcon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M17.25 10C17.25 12.8995 14.8995 15.25 12 15.25C9.10051 15.25 6.75 12.8995 6.75 10C6.75 7.10051 9.10051 4.75 12 4.75C14.8995 4.75 17.25 7.10051 17.25 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M8.75 14.75L7.75 19.25L12 17.75L16.25 19.25L15.25 14.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        ),
        tileLink: "/Settings/Learning",
        colour: "secondary",
        key: "learning",
        children: [
          { name: "Create", href: "#", colour: "secondary", key: "create" },
          { name: "Manage", href: "#", colour: "secondary", key: "manage" },
        ],
      },
      {
        name: "Notifications",
        tileIcon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M17.25 12V10C17.25 7.1005 14.8995 4.75 12 4.75C9.10051 4.75 6.75 7.10051 6.75 10V12L4.75 16.25H19.25L17.25 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9 16.5C9 16.5 9 19.25 12 19.25C15 19.25 15 16.5 15 16.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M17.75 4.75C17.75 4.75 18.3981 4.89794 18.7501 5.24996C19.1021 5.60197 19.25 6.25 19.25 6.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M6.25 4.75C6.25 4.75 5.60193 4.89794 5.24992 5.24996C4.8979 5.60197 4.75 6.25 4.75 6.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        ),
        href: "#",
        colour: "secondary",
        key: "notifications",
      },
      {
        name: "Roles",
        tileIcon: (
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className=""
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 13.25a4.25 4.25 0 10-4.154-3.346L4.75 16v3.25H8l.75-.75v-1.75h1.75l1.25-1.25v-1.75h1.75l.596-.596c.291.063.594.096.904.096z"
            ></path>
            <path
              stroke="currentColor"
              d="M16.5 8a.5.5 0 11-1 0 .5.5 0 011 0z"
            ></path>
          </svg>
        ),
        href: "#",
        colour: "secondary",
        key: "roles",
      },
    ],
  },
  {
    name: "Shop",
    colour: "neutral",
    href: "#",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6.75 19.25h10.5a2 2 0 002-2V8.183a2 2 0 00-.179-.827l-.538-1.184A2 2 0 0016.713 5H7.287a2 2 0 00-1.82 1.172L4.93 7.356a2 2 0 00-.18.827v9.067a2 2 0 002 2z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.5 7.75c0 1.243-1 2.5-2.5 2.5s-2.25-1.257-2.25-2.5M19.25 7.75c0 1.243-.75 2.5-2.25 2.5s-2.5-1.257-2.5-2.5M14.5 7.75c0 1.243-1 2.5-2.5 2.5s-2.5-1.257-2.5-2.5M9.75 15.75a2 2 0 012-2h.5a2 2 0 012 2v3.5h-4.5v-3.5z"
        ></path>
      </svg>
    ),
    tileTitle: "Shop",
    tileIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="106"
        height="34"
        fill="none"
        viewBox="0 0 106 34"
        className="ml-2"
      >
        <path fill="#06B6D4" d="M8 3a2 2 0 11-4 0 2 2 0 014 0z"></path>
        <path
          stroke="#06B6D4"
          strokeLinecap="round"
          strokeMiterlimit="3.994"
          strokeWidth="4"
          d="M6 9.5v18a4 4 0 01-4 4v0"
        ></path>
        <path fill="#06B6D4" d="M35 3a2 2 0 11-4 0 2 2 0 014 0z"></path>
        <path
          stroke="#06B6D4"
          strokeLinecap="round"
          strokeMiterlimit="3.994"
          strokeWidth="4"
          d="M33 10v13M40 23v-7.5a5.5 5.5 0 015.5-5.5v0a5.5 5.5 0 015.5 5.5V23"
        ></path>
        <path
          stroke="#3b3b3b"
          strokeLinecap="round"
          strokeMiterlimit="3.994"
          strokeWidth="4"
          d="M65 23v-7.5a5.5 5.5 0 015.5-5.5v0a5.5 5.5 0 015.5 5.5V23"
        ></path>
        <path fill="#3b3b3b" d="M60 3a2 2 0 11-4 0 2 2 0 014 0z"></path>
        <path
          stroke="#3b3b3b"
          strokeLinecap="round"
          strokeMiterlimit="3.994"
          strokeWidth="4"
          d="M58 10v13"
        ></path>
        <path
          stroke="#06B6D4"
          strokeLinecap="round"
          strokeMiterlimit="3.994"
          strokeWidth="4"
          d="M19.5 23a6.5 6.5 0 110-13 6.5 6.5 0 010 13zM83 9l13.906 6.084c.799.35.799 1.483 0 1.832L83 23"
        ></path>
      </svg>
    ),
    tileIconClassName: "opacity-100 relative [&>svg]:w-28",
    key: "shop",
  },
];
