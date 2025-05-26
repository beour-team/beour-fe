// yarn add @mui/material @emotion/react @emotion/styled
// mui 슬라이더 라이브러리 설치 필요
import Slider from "@mui/material/Slider";
import { useState } from "react";

const PriceSlider = () => {
  const [value, setValue] = useState<number[]>([0, 1000000]);
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
      <div className="font-semibold text-[1.8rem] my-[1.3rem]">
        {value[0].toLocaleString()}원 ~ {value[1].toLocaleString()}원
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={150000}
        step={1000}
        sx={{
          color: "#6B96F9",
          "& .MuiSlider-rail": {
            backgroundColor: "#DCE1E9", // 범위 외 트랙 색상
          },
          "& .MuiSlider-thumb": {
            width: 15,
            height: 15,
          },
        }}
      />
    </div>
  );
};

export default PriceSlider;
