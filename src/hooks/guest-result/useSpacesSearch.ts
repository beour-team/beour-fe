import { useState, useEffect } from "react";
import { fetchSpacesAPI } from "../../api/guest-result/resultspaces";
import type { SearchResultItems } from "../../types/guest-main/SearchResultItems";

interface UseSpacesSearchProps {
  keyword: string;
  page: number;
}

interface UseSpacesSearchReturn {
  spaces: SearchResultItems[];
  totalPage: number;
  last: boolean;
  loading: boolean;
  error: Error | null;
}

const useSpacesSearch = ({ keyword, page }: UseSpacesSearchProps): UseSpacesSearchReturn => {
  const [spaces, setSpaces] = useState<SearchResultItems[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [last, setLast] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSpacesAPI(keyword, page);
        setSpaces(data.spaces);
        setLast(data.last);
        setTotalPage(data.totalPage);
      } catch (err) {
        setError(err as Error);
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, page]);

  return { spaces, totalPage, last, loading, error };
};

export default useSpacesSearch;
