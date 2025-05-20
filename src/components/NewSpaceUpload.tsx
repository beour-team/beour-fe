type NewSpace = {
  src: string;
  location: string;
  name: string;
  price: string;
};

type NewSpaceUploadProps = {
  space: NewSpace;
  index: number;
};

const NewSpaceUpload = ({ space, index }: NewSpaceUploadProps) => {
  return (
    <div
      key={index}
      className="relative aspect-squre w-[20.4rem] h-[20rem] overflow-hidden flex-shrink-0"
    >
      <img
        src={space.src}
        alt={`새 공간 ${index + 1}`}
        className="rounded-[1.2rem] object-cover w-full h-full"
      />
      <div className="absolute bottom-[1.3rem] left-[1rem] text-white text-shadow-sm">
        <div className="text-[1rem] font-thin">{space.location}</div>
        <div className="text-[1.2rem] font-regular py-3">{space.name}</div>
        <div className="text-[#888] pb-2">{space.price}</div>
      </div>
    </div>
  );
};

export default NewSpaceUpload;
