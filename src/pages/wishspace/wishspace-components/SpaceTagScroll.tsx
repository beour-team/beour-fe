import { useRef, useState } from "react";

interface SpaceTagScrollProps {
  tags: string[];
}

const SpaceTagScroll = ({ tags }: SpaceTagScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);

    // 드래그 중 텍스트 선택 방지
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";
  };

  return (
    <div className="relative min-h-[2.8rem]">
      <div
        ref={scrollRef}
        className={`flex gap-[0.6rem] overflow-x-auto scrollbar-hide pb-[0.2rem] scroll-smooth ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-[1rem] py-[0.4rem] bg-cr-primary rounded-[1.4rem] text-13-Medium text-cr-blue whitespace-nowrap flex-shrink-0 select-none"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 오른쪽 그라데이션 오버레이 */}
      {tags.length > 3 && (
        <div className="absolute right-0 top-0 h-full w-[2rem] bg-gradient-to-l from-cr-white to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default SpaceTagScroll;
