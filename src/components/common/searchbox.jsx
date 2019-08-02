import React from "react";

const SearchBox = ({ value, onChange, firstInput }) => {
  return (
    <input
      type="text"
      name="query"
      ref={firstInput}
      // className="col-2 offset-10  mt-3"
      className="mt-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
