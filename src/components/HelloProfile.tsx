// 게스트/호스트님 안녕하세요!
const HelloProfile = () => {
  return (
    <div className="flex items-center justify-between pb-[1rem]">
      <div>
        <div className="text-24-Bold leading-[3rem] pb-[0.7rem]">게스트님</div>
        <div className="text-24-Bold mb-[1rem]">안녕하세요!</div>
      </div>
      <div className="bg-cr-600 w-[4.5rem] h-[4.5rem] rounded-full" />
    </div>
  );
};

export default HelloProfile;
