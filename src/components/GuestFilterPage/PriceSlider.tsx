// yarn add @mui/material @emotion/react @emotion/styled
// mui 슬라이더 라이브러리 설치 필요
import Slider from "@mui/material/Slider";
import { useState } from "react";

const PriceSlider = () => {
  const [value, setValue] = useState<number[]>([0, 1000000]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
      <div className="font-semibold text-[1.6rem] my-[1.3rem]">
        {value[0].toLocaleString()}원 ~ {value[1].toLocaleString()}원
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={150000}
        step={1000}
        sx={{
          color: "#000000",
        }}
      />
    </div>
  );
};

export default PriceSlider;
