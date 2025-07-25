//접기, 더보기 버튼 식
import { useEffect, useRef, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface ExpandableTextSectionProps {
  title: string;
  content: string;
  maxHeight?: number; // 단위 포함
}

const ExpandableTextSection = ({
  title,
  content,
  maxHeight = 130,
}: ExpandableTextSectionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [needToggle, setNeedToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setNeedToggle(contentRef.current.scrollHeight > maxHeight);
    }
  }, [content, maxHeight]);

  return (
    <div className="mx-[1.5rem] my-[2rem]">
      <span className="text-13-SemiBold">{title}</span>
      <div
        ref={contentRef}
        className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line overflow-hidden"
        style={{
          maxHeight: !expanded && needToggle ? maxHeight : "none",
        }}
      >
        {content}
      </div>

      {needToggle && (
        <button
          className="bg-cr-400 text-cr-white text-14-Medium rounded-[1rem] w-full h-[4rem] flex items-center justify-center gap-2"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? (
            <>
              접기 <SlArrowUp />
            </>
          ) : (
            <>
              더보기 <SlArrowDown />
            </>
          )}
        </button>
      )}
    </div>
  );
};
export default ExpandableTextSection;
