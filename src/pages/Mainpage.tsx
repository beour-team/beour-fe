import React from 'react';
import './Mainpage.css';

const Mainpage: React.FC = () => {
  return (
    <div>
      <div className="box">
        <div className="overlap-group flex justify-between items-center">
          <div className="text-wrapper">Be:our</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-white h-[24px] w-[24px] ml-auto mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
