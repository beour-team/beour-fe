import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { regions } from "../../constants/region";

interface RegionInputProps {
  initialValue: string;
  onComplete: (region: string) => void;
}

const RegionInput = ({ onComplete, initialValue }: RegionInputProps) => {
  //카카오 api로 테스트 하면 보안상의 문제가 있어 mockdata 사용
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput(initialValue ?? "");
    setSuggestions([]);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      const filtered = regions.filter((r) => r.includes(value));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (region: string) => {
    setInput(region);
    setSuggestions([]);
    onComplete(region);
  };

  return (
    <div className="fixed bottom-0 bg-white rounded-t-2xl shadow-xl p-[3rem] h-[79rem] w-[39rem] left-[51%] -translate-x-1/2 overflow-y-auto z-50">
      <div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="가까운 역, 동네, 건물 입력"
          className="bg-[#E9EBEE] rounded-[0.7rem] text-[1.3rem] w-full h-[3.6rem] px-5 font-regular appearance-none"
        />
        <FiSearch
          size={20}
          className="absolute right-[4rem] top-[4.8rem] -translate-y-1/2 text-[#B4B4B4] cursor-pointer"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="mt-4 max-h-[20rem] overflow-y-auto">
          {suggestions.map((region, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(region)}
              className="px-4 py-3 hover:bg-[#EFEFEF] cursor-pointer text-[1.1rem]"
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegionInput;
