import React from 'react';

const ReportBugButton: React.FC = () => {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScNrqWH84AdeRm2ApakmUPCzmZm2ZA5wGFPOKl0XspQnB0VJA/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-[1002]"
    >
      Report Bug
    </a>
  );
};

export default ReportBugButton;
