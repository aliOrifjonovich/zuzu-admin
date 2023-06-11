import React, { useRef, useState } from "react";
import cls from "./search.module.scss";
import { Center } from "@chakra-ui/react";
const Search = ( {searchValue, setSearchValue}) => {
  // const [searchValue, setSearchValue]= useState("")
  // const { data } = useQuery(["getAllData", slug], () =>
  //   getAll(slug).then((res) => res.data)
  // );
    const InputRef = useRef();
    const handleSearch = (e)=>{
      e.preventDefault();
      setSearchValue(e.target["input"].value)
    }
  return (
    <div className={cls.search_wrapper} onClick={()=>InputRef.current.focus()}>
      <form onSubmit={handleSearch}>
        <Center>
          <button onClick={()=>setSearchValue("")} type="submit">
            <box-icon name="search" size="30px"></box-icon>
          </button>
        </Center>
        <input name="input" type="text" placeholder="Search..." ref={InputRef}/>
      </form>
    </div>
  );
};

export default Search;
