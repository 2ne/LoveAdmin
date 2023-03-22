import React, { ReactElement } from "react";

export interface Step {
  name: string;
  status: "complete" | "current" | "incomplete";
}

interface StepsProps {
  steps: Step[];
}

const Steps: React.FC<StepsProps> = ({ steps }): ReactElement => {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="relative flex items-center justify-between p-0 list-none"
      >
        {steps.map((step) => (
          <li className="relative grow last:grow-0" key={step.name}>
            {step.status === "complete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary-500" />
                </div>
                <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-primary-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M7.75 12.75L10 15.25L16.25 8.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-neutral-200" />
                </div>
                <div
                  className="relative flex items-center justify-center w-5 h-5 bg-white border-2 border-solid rounded-full border-primary-500"
                  aria-current="step"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-primary-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-neutral-200" />
                </div>
                <div className="relative flex items-center justify-center w-5 h-5 bg-white border-2 border-solid rounded-full border-neutral-300">
                  <span
                    className="w-2 h-2 bg-transparent rounded-full"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Steps;
