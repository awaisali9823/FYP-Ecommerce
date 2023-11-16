import React from "react";

const Wrapper = ({ children, bgColor }) => {
  return (
    <div className={`bg-${bgColor} w-full overflow-hidden`}>
      <div className={`sm:px-16 px-6 flex justify-center items-center`}>
        <div className={`xl:max-w-[1280px] w-full`}>{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
