import React from "react";

interface SearchProps {
  placeholder?: string;
  inputText?: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  listData?: string[];
  setResults?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchBar: React.FC<SearchProps> = React.memo(
  ({
    placeholder = "",
    inputText = "",
    setInputText,
    listData = [],
    setResults = () => null,
  }) => {
    const handleChange = (value: string) => {
      if (value === "") {
        if (setResults) setResults([]);
      } else {
        const newResult = listData.filter((data: string) =>
          data.includes(value.toLowerCase())
        );
        if (setResults) setResults(newResult);
      }
      setInputText(value);
    };
    return (
      <input
        value={inputText}
        className="pl-3 w-[90%] bg-transparent focus:outline-none"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    );
  }
);
