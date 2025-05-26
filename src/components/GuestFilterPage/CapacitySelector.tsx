// 인원수 -,+ 컴포넌트
import { useState } from "react";

const CapacitySelector = () => {
  const [count, setCount] = useState(1);

  const increase = () => {
    if (count < 20) setCount(count + 1); //최대 20명까지 제한 (수정 가능)
  };

  const decrease = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="mb-[4rem] flex items-center justify-between ">
      <div className="text-[1.4rem] font-semibold">
        최대 {count}인 수용 공간을 원해요
      </div>
      <div className=" flex items-center justify-center border-[2px] border-[#F2F2F2] rounded-[1rem] bg-white">
        <button
          onClick={decrease}
          className="w-10 h-10 rounded-[0.6rem] bg-[#F2F2F2] text-xl font-bold hover:bg-gray-300 text-[#C6C6C6]"
        >
          -
        </button>
        <div className="flex items-center justify-center w-[3rem] bg-white rounded-[0.6rem]">
          {count}
        </div>
        <button
          onClick={increase}
          className="w-10 h-10 rounded-[0.6rem] bg-[#F2F2F2] text-xl font-bold hover:bg-gray-300 text-[#C6C6C6]"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CapacitySelector;
