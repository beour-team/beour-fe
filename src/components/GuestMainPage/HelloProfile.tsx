const HelloProfile = () => {
  //비로그인 상태일때 필요
  return (
    <div className="flex items-center gap-3 pb-[1rem]">
      <div className="font-extrabold text-[2.4rem] leading-[3rem]">
        000님 <br />
        안녕하세요!
      </div>
    </div>
  );
};

export default HelloProfile;
