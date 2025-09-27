"use client";

import { OptionInterface } from "@/types/optionInterface";
import React from "react";
import Select from "react-select";

export default function Dropdown({
  value,
  handleOnChange,
  options = [],
  placeholder,
  width = "",
}: {
  value: any;
  handleOnChange: (evt: OptionInterface) => void;
  options: OptionInterface[];
  placeholder: string;
  width?: string;
}) {
  return (
    <div className={`flex flex-col`}>
      <Select
        options={options}
        value={value}
        components={{
          IndicatorSeparator: () => false,
        }}
        styles={{
          control: (base, { isFocused, isDisabled }) => ({
            ...base,
            borderRadius: "8px",
            borderColor: isFocused ? "#0f4073" : "oklch(87.2% 0.01 258.338)",
            ":hover": {
              ...base[":hover"],
              borderColor: isFocused ? "#0f4073" : "oklch(87.2% 0.01 258.338)",
              cursor: isDisabled ? "not-allowed" : "pointer",
            },
            boxShadow: isFocused ? "0 0 0 2px #0f407340" : "",
            backgroundColor: "white",
            width: "100%",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "14px",
          }),
          option: (base, { isSelected, isFocused }) => ({
            ...base,
            fontSize: "14px",
            backgroundColor: isSelected ? "#DEEDFB" : isFocused ? "#F0F7FE" : "white",
            color: "#020618",
            ":hover": {
              ...base[":hover"],
              cursor: "pointer",
            },
          }),
          singleValue: (base, { isDisabled }) => ({
            ...base,
            fontSize: "14px",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 99999,
            borderRadius: "8px",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 99999,
          }),
          valueContainer: (base, { isDisabled }) => ({
            ...base,
            cursor: isDisabled ? "not-allowed" : "pointer",
            padding: "10.5px 16px",
          }),
          input: (base) => ({
            ...base,
            padding: 0,
            margin: 0,
          }),
          container: (base, props) => ({
            ...base,
            width: width,
          }),
        }}
        placeholder={placeholder}
        menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
        onChange={handleOnChange}
      />
    </div>
  );
}
