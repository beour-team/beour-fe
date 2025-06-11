import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchbarProps {
  onSearch: (value: string) => void;
  bgcolor?: string;
}

const Searchbar = ({ onSearch, bgcolor = "bg-[#E9EBEE]" }: SearchbarProps) => {
  const [value, setValue] = useState<string>("");

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value);
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="찾는 공간이 있나요?"
          className={`${bgcolor} rounded-[0.7rem] text-[1.3rem] w-full h-[3.6rem] px-5 font-regular appearance-none`}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {value === "" && (
          <FiSearch
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9A9A9] cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
export default Searchbar;
