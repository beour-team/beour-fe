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
    <div>
      {results.map((item, index) => (
        <div key={index} className="my-[2rem] flex gap-[1rem]">
          <img
            src={item.thumbnail_url}
            alt={item.name}
            className="w-[18rem] h-[19rem] object-cover rounded-[1rem]"
          />

          <div className="py-2">
            <div className="text-[1.7rem] font-semibold pb-[1rem] text-[#313131]">
              {item.name}
            </div>

            <div className="flex items-center gap-5 text-[1.2rem] pb-[1rem]">
              <div className="flex">
                <FaMapMarkerAlt className="text-[#666666]" />
                <span className="text-[#505050]">{item.address}</span>
              </div>
              <div className="flex">
                <IoPersonSharp className="text-[#666666]" />
                <span className="text-[#505050]">
                  최대 {item.guest_count}인
                </span>
              </div>
            </div>

            <div className="flex text-[1.2rem]">
              <GoStarFill className="text-[#FFCC00]" />
              <span className="font-semibold">{item.rating}</span>
            </div>

            <div className="flex">
              <div>{item.category}</div>
              <div>{item.use}</div>
            </div>

            <div>{item.price_per_hour} 원/시간</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
