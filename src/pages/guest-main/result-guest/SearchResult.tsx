import SearchResultCard from "./SearchResultCard";
import type { SearchResultItems } from "../../../types/guest-main/SearchResultItems";

interface SearchResultsProps {
  results?: SearchResultItems[];
}

const SearchResult = ({ results }: SearchResultsProps) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-14-Medium py-[1rem]">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className="px-1">
      {results.map((item) => (
        <SearchResultCard key={item.spaceId} item={item} />
      ))}
    </div>
  );
};

export default SearchResult;
