import React from "react";
import { Segmented } from "./ui/Segmented";
import { Strength } from "../lib/types";

interface StrengthSliderProps {
  value: Strength;
  onChange: (value: Strength) => void;
  disabled?: boolean;
}

export function StrengthSlider({
  value,
  onChange,
  disabled = false,
}: StrengthSliderProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${disabled ? "opacity-50" : ""}`}>
      <Segmented<Strength>
        label="Strength"
        value={value}
        onChange={onChange}
        options={[
          { label: "Light", value: "light" },
          { label: "Heavy", value: "heavy" },
        ]}
      />
    </div>
  );
}
