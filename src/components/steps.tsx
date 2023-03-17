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
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-primary-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
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
                  className="relative flex items-center justify-center w-6 h-6 bg-white border-2 border-solid rounded-full border-primary-500"
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
                <div className="relative flex items-center justify-center w-6 h-6 bg-white border-2 border-solid rounded-full border-neutral-300">
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
