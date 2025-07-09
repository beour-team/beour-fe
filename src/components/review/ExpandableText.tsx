//접기 더보기 부분 reply 없어야해서 그대로 사용해서 따로 만들었어요.
import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  id: number | string;
}

const ExpandableText = ({ text, id }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const isLong = (text: string) => text.length > 65;

  return (
    <div className="text-14-Medium leading-[2.2rem] break-word">
      {!expanded[id] && isLong(text) ? (
        <span>
          {text.slice(0, 70)}...
          <button
            onClick={() => setExpanded((prev) => ({ ...prev, [id]: true }))}
            className="text-cr-400 text-[1.3rem] pl-[0.4rem]"
          >
            더보기
          </button>
        </span>
      ) : (
        <span>
          {text}
          {isLong(text) && (
            <button
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [id]: false,
                }))
              }
              className="text-cr-400 text-[1.3rem] pl-[0.4rem]"
            >
              접기
            </button>
          )}
        </span>
      )}
    </div>
  );
};

export default ExpandableText;
