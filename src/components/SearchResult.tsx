import type { SearchResultItem } from "../constants/SearchData";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";

interface SearchResultsProps {
  results?: SearchResultItem[];
}

const SearchResult = ({ results }: SearchResultsProps) => {
  if (!results || results.length === 0) {
    return <div>검색결과가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem] divide-y divide-[#ECECEC]">
      {results.map((item, index) => (
        <div key={index} className="py-[2rem] flex gap-[1rem]">
          <img
            src={item.thumbnail_url}
            alt={item.name}
            className="w-[17rem] h-[19rem] object-cover rounded-[1rem]"
          />
          <div className="flex flex-col justify-between py-2 h-[19rem]">
            <div>
              <div className="text-[1.5rem] font-semibold pb-[1rem] text-[#313131]">
                {item.name}
              </div>

              <div className="flex items-center text-[1.2rem] pb-[1rem] gap-5">
                <div className="flex gap-[0.4rem] items-center">
                  <FaMapMarkerAlt size={14} className="text-[#666666]" />
                  <span className="text-[#505050]">{item.address}</span>
                </div>
                <div className="flex gap-[0.4rem] items-center">
                  <IoPersonSharp size={14} className="text-[#666666]" />
                  <span className="text-[#505050]">
                    최대 {item.guest_count}인
                  </span>
                </div>
              </div>

              <div className="flex text-[1.2rem] pb-[0.8rem] gap-[0.4rem] items-center">
                <GoStarFill className="text-[#FFCC00]" />
                <span className="font-semibold">{item.rating}</span>
              </div>

              <div className="flex gap-3">
                <div>{item.category}</div>
                <div>{item.use}</div>
              </div>
            </div>

            <div className="font-black text-[#313131] text-[1.7rem] text-right">
              {item.price_per_hour} 원/시간
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
