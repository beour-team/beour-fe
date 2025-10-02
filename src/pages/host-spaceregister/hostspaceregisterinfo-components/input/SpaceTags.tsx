import { useState } from "react";
import { cancel_dark } from "../../../../assets/theme";

interface SpaceTagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const SpaceTags = ({ tags, setTags }: SpaceTagsProps) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">공간 태그</label>

      {/* 입력창 + 추가 버튼 */}
      <div className="flex gap-[0.8rem]">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="태그를 추가해주세요"
          className="flex-1 h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className={`h-[5.6rem] px-[2.4rem] rounded-[1rem] text-14-Medium whitespace-nowrap
    ${tagInput.trim() ? "bg-cr-black text-cr-white" : "bg-cr-300 text-cr-600"}`}
        >
          태그 추가
        </button>
      </div>

      {/* 태그 목록 */}
      <div className="flex flex-wrap gap-[0.8rem] mt-[1rem]">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="bg-cr-500 text-cr-white rounded-full px-[1.6rem] py-[0.9rem] text-[1.3rem] relative"
          >
            {tag}
            <img
              src={cancel_dark}
              alt="삭제 아이콘"
              className="w-[2rem] h-[2rem] cursor-pointer absolute -top-[0.6rem] -right-[0.8rem] rounded-full p-[0.2rem]"
              onClick={() => handleRemoveTag(tag)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceTags;
