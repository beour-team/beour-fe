import { useRef } from "react";

const ReviewReply = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 초기화
      textarea.style.height = textarea.scrollHeight + "px"; // 실제 내용에 맞게 재조정
    }
  };
  return (
    <div className="w-full relative mt-[2rem]">
      <textarea
        ref={textareaRef}
        className="textarea  w-full rounded-[1rem] focus:outline-none focus:border-none border-none bg-cr-200 text-14-Medium leading-[2rem] no-scrollbar resize-none pr-[6.2rem] py-[1.4rem] h-[5rem] focus:ring-0"
        placeholder="답글을 달아주세요"
        onInput={handleInput}
        rows={1}
      />
      <button className="mx-[2rem]  text-14-SemiBold text-cr-800 absolute z-10 w-[2.6rem] right-0 bottom-[1.8rem]">
        등록
      </button>
    </div>
  );
};
export default ReviewReply;
