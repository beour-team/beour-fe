// yarn add tailwind-scrollbar-hide
import PageHeader from "../../components/header/PageHeader";
import { BlackStar, people, spot, star } from "../../assets/theme";

const dummyList = [
  {
    spaceId: 1,
    spaceName: "우리동네 공방",
    region: "강남구",
    maxCapacity: 10,
    price: 15000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.0,
    tags: ["공방", "강남", "강남", "강남", "강남", "강남"],
  },
  {
    spaceId: 3,
    spaceName: "우리동네 베이킹 공방",
    region: "마포구",
    maxCapacity: 8,
    price: 10000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 3.0,
    tags: ["공방", "마포", "와이파이"],
  },
  {
    spaceId: 4,
    spaceName: "성수 홈베이킹 스튜디오",
    region: "성동구",
    maxCapacity: 6,
    price: 18000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.0,
    tags: ["성수", "엠지", "핫플"],
  },
];

// 12개로 맞추기 위해 반복
const wishSpaces = Array.from({ length: 12 }, (_, i) => {
  const base = dummyList[i % dummyList.length];
  return {
    ...base,
    spaceId: base.spaceId + i * 10,
    spaceName: `${base.spaceName} ${i + 1}`,
  };
});

const WishSpace = () => {
  return (
    <div>
      <div className="mx-[2rem]">
        <PageHeader>찜 공간</PageHeader>
        <div className="text-13-Medium text-cr-500">총 12개</div>
      </div>
      <div className="grid grid-cols-2 gap-x-[0.8rem] gap-y-[2rem] px-[2rem] mt-[2rem]">
        {wishSpaces.map((item) => (
          <div
            key={item.spaceId}
            className="relative bg-white rounded-[1rem] overflow-hidden flex flex-col gap-[2rem]"
          >
            <div className="relative w-full h-[16rem] bg-gray-100 rounded-[1rem]">
              <img
                src={item.thumbnailUrl}
                alt={item.spaceName}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-[1rem] right-[1rem] z-10">
                {item.like ? (
                  <img src={star} className="h-[2.7rem]" />
                ) : (
                  <img src={BlackStar} className="h-[2.7rem] " />
                )}
              </button>
            </div>
            <div className="flex flex-col gap-[1.2rem]">
              <div
                className="text-16-Bold font-semibold truncate"
                title={item.spaceName}
              >
                {item.spaceName}
              </div>
              <div className="flex items-center text-[1rem] gap-[1.2rem] text-[#888]">
                <div className="flex gap-[0.4rem]">
                  <img src={spot} className="h-[1.5rem]" />
                  <span className="text-13-Medium">{item.region}</span>
                </div>
                <div className="flex gap-[0.4rem]">
                  <img src={people} className="h-[1.2rem]" />
                  <span className="text-13-Medium">
                    최대 {item.maxCapacity}인
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[1rem]">
                <img src={star} className="h-[1.7rem]" />
                <span className="text-13-Medium pt-[0.1rem]">
                  {item.average.toFixed(1)}
                  <span className="text-13-Medium text-cr-500">(103)</span>
                </span>
              </div>
              <div className="relative h-[2.5rem]">
                <div className="overflow-x-auto whitespace-nowrap scrollbar-hide h-full ">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block rounded-[4.9rem] bg-[#E9EBEE] px-[1.2rem] text-[#9D9D9D] text-13-Medium h-full py-[0.6rem] mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute top-0 right-0 h-full w-[2rem] fade-right"></div>
              </div>
              <div className="font-black text-[#313131] text-16-ExtraBold mt-2">
                {item.price.toLocaleString()}원/시간
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishSpace;
