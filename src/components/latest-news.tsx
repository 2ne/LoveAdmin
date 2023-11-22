import React from "react";

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
        <li>
          <div className="mb-1.5 text-subtitle">October 31st</div>
          <a className="block mb-1.5 font-medium text-base/6 text-primary-600 group hover:no-underline">
            <span className="group-hover:underline font-display">
              Take your communication to the next level with SMS marketing
            </span>
          </a>
          <div className="text-base text-neutral-700">
            Cut through communication clutter with our new SMS service. Deliver
            direct, targeted messages that drive action and income, reaching
            your audience anytime, anywhere.
          </div>
        </li>
        <li>
          <div className="mb-1.5 text-subtitle">October 31st</div>
          <a className="block mb-1.5 font-medium text-base/6 text-primary-600 group hover:no-underline">
            <span className="mr-2">🎉</span>
            <span className="group-hover:underline font-display">
              LoveAdmin 2.5 is live!
            </span>
          </a>
          <div className="text-base text-neutral-700">
            We have just released a brand new email editor which allows you to
            send great looking emails. We have a selection of over 10 new
            templates ready for you to use.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LatestNews;
