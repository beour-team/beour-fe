interface SpeechBubbleProps {
  text: string;
}

export const ToolTip: React.FC<SpeechBubbleProps> = ({ text }) => {
  return (
    <div className="relative bg-cr-blue text-cr-white text-14-Medium text-center py-[0.8rem] rounded-[1rem] h-[4rem] leading-[2.4rem] w-[22rem]">
      <div className="absolute left-[-1.2rem] top-[1.2rem] w-0 h-0 border-t-[0.8rem] border-t-transparent border-b-[0.8rem] border-b-transparent border-r-[1.4rem] border-cr-blue" />
      {text}
    </div>
  );
};
