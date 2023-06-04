import React, { useRef } from "react";
import cls from "./search.module.scss";
import { Center } from "@chakra-ui/react";
const Search = () => {
    const InputRef = useRef();
    console.log(InputRef);

  return (
    <div className={cls.search_wrapper} onClick={()=>InputRef.current.focus()}>
      <form>
        <Center>
          <button type="submit">
            <box-icon name="search" size="30px"></box-icon>
          </button>
        </Center>
        <input type="text" placeholder="Search..." ref={InputRef}/>
      </form>
    </div>
  );
};

export default Search;
