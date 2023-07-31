import React, { useRef, useState } from "react";
import cls from "./search.module.scss";
import { Center } from "@chakra-ui/react";
const Search = ({ searchValue, setSearchValue }) => {
  // const [value, setValue] = useState("");
  // const { data } = useQuery(["getAllData", slug], () =>
  //   getAll(slug).then((res) => res.data)
  // );
  const InputRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div
      className={cls.search_wrapper}
      onClick={() => InputRef.current.focus()}
    >
      <form>
        <Center>
          <button>
            <box-icon name="search" size="30px"></box-icon>
          </button>
        </Center>
        <input
          name="input"
          type="text"
          placeholder="Search..."
          value={searchValue}
          ref={InputRef}
          onChange={handleSearch}
        />
      </form>
    </div>
  );
};

export default Search;
