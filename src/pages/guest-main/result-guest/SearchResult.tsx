import SearchResultCard from "./SearchResultCard";
import type { SearchResultItem } from "../../../constants/searh-data";

interface SearchResultsProps {
  results?: SearchResultItem[];
}

const SearchResult = ({ results }: SearchResultsProps) => {
  if (!results || results.length === 0) {
    return <div>검색결과가 없습니다.</div>;
  }

  return (
    <div className="px-1">
      {results.map((item) => (
        <SearchResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SearchResult;
