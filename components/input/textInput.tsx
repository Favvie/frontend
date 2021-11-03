import React from "react";

function TextInput({ text, type, value, setValue, hide }) {
  return (
    <div className="tw-flex tw-flex-col">
      <label
        htmlFor={text}
        className={`tw-text-base tw-text-gray-kwek200 tw-font-medium tw-capitalize tw-mb-2 ${hide}`}
      >
        {text}
      </label>
      <input
        id={text}
        type={type}
        placeholder={text}
        className="tw-rounded-sm tw-w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
