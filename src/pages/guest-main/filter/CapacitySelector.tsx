// 인원수 -,+ 컴포넌트
// import { useState } from "react";

interface CapacitySelectorProps {
  capacity: number;
  setCapacity: React.Dispatch<React.SetStateAction<number>>;
}

const CapacitySelector = ({ capacity, setCapacity }: CapacitySelectorProps) => {
  // const [capacity, setcapacity] = useState(1);

  const increase = () => {
    if (capacity < 20) setCapacity(capacity + 1); //최대 20명까지 제한 (수정 가능)
  };

  const decrease = () => {
    if (capacity > 1) setCapacity(capacity - 1);
  };

  return (
    <div className="mb-[4rem] flex items-center justify-between ">
      <div className="text-16-SemiBold">
        최대 {capacity}인 수용 공간을 원해요
      </div>

      <div className="flex items-center justify-center border-[3.5px] border-cr-200 rounded-[1rem] bg-cr-200 px-1">
        <button
          onClick={decrease}
          className="w-10 h-10 flex items-center justify-center text-[1.6rem] font-bold text-cr-500"
        >
          -
        </button>

        <div className="flex items-center justify-center w-[3.4rem] h-10 bg-white rounded-[0.7rem] mx-2 text-14-SemiBold">
          {capacity}
        </div>

        <button
          onClick={increase}
          className="w-10 h-10 flex items-center justify-center text-[1.6rem] font-bold text-cr-500"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CapacitySelector;
