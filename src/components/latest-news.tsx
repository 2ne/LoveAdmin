import React from "react";

type NewsItem = {
  date?: string;
  title: string;
  description: string;
  link?: string;
};

const newsItems: NewsItem[] = [
  {
    title:
      "🚨 We're currently experiencing a service outage for our email service",
    description:
      "We are investigating an issue with our email service. We hope to have this back up and working within the hour. Sorry for the inconvenience.",
  },
  {
    date: "February 2nd",
    title: "🚀 Streamline Your Workflow with Our New Integration Tools",
    description:
      "Our new integration tools are here to help you streamline your workflow. Connect with over 100+ services and bring all your work into one place, saving time and boosting efficiency.",
    link: "https://example.com/integration-tools",
  },
  {
    date: "January 31st",
    title: "📱 Take your communication to the next level with SMS marketing",
    description:
      "Cut through communication clutter with our new SMS service. Deliver direct, targeted messages that drive action and income, reaching your audience anytime, anywhere.",
  },
  {
    date: "January 29th",
    title: "🎉 LoveAdmin 2.5 is live!",
    description:
      "We have just released a brand new email editor which allows you to send great looking emails. We have a selection of over 10 new templates ready for you to use.",
    link: "https://example.com/loveadmin-update",
  },
  {
    date: "January 25th",
    title: "📈 Upgrade Your Analytics with Enhanced Reporting Features",
    description:
      "Dive deeper into your data with our enhanced reporting features. New filters, custom reports, and interactive dashboards give you the insights you need to make informed decisions.",
  },
];

const LatestNews: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-2 -mt-1 text-lg mb-7 font-display text-primary-950">
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="w-7 h-7"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M19.25 10c0 2.729-1.4 5.25-2.75 5.25s-2.75-2.521-2.75-5.25 1.4-5.25 2.75-5.25 2.75 2.521 2.75 5.25z"
          ></path>
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M16.5 15.25S8 13.5 7 13.25 4.75 11.69 4.75 10 6 7 7 6.75s9.5-2 9.5-2M6.75 13.5v3.75a2 2 0 002 2h.5a2 2 0 002-2V14.5"
          ></path>
        </svg>
        <span>Latest News...</span>
      </div>
      <ul className="space-y-7">
        {newsItems.map((item, index) => (
          <li key={index}>
            <div className="mb-1.5 text-subtitle">{item.date}</div>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-1.5 font-medium text-base/6 text-primary-600 group hover:no-underline"
              >
                <span className="group-hover:underline font-display">
                  {item.title}
                </span>
              </a>
            ) : (
              <div className="mb-1.5 font-medium text-base/6 text-primary-600">
                <span className="font-display">{item.title}</span>
              </div>
            )}
            <div className="text-base text-neutral-700">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNews;
