import CategoryIcon from "./CategoryIcon";
import party from "../assets/party.png";
import practice from "../assets/practice.png";
import streaming from "../assets/streaming.png";
import study from "../assets/study.png";

const UseCategoryData = [
  { imgSrc: party, label: "파티룸" },
  { imgSrc: practice, label: "연습실" },
  { imgSrc: streaming, label: "라이브방송" },
  { imgSrc: study, label: "스터디룸" },
  { imgSrc: party, label: "파티룸" },
  { imgSrc: practice, label: "연습실" },
  { imgSrc: streaming, label: "라이브방송" },
  { imgSrc: study, label: "스터디룸" },
  { imgSrc: party, label: "파티룸" },
  { imgSrc: practice, label: "연습실" },
  { imgSrc: streaming, label: "라이브방송" },
  { imgSrc: study, label: "스터디룸" },
];

const SpaceCategory = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-around">
      {UseCategoryData.map((item) => (
        <CategoryIcon
          key={item.label}
          imgSrc={item.imgSrc}
          label={item.label}
        />
      ))}
    </div>
  );
};
export default SpaceCategory;
