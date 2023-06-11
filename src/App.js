import { Route, Routes } from "react-router-dom";
import "./App.css";
import DynecmicTable from "./components/Table/DynecmicTable";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] =useState(false);
  const [searchValue, setSearchValue]= useState("")
  useEffect(() => {
    if(isDark) {
      document.body.classList.add("darkMode")
    }else{
      document.body.classList.remove("darkMode")
    }
  }, [isDark]);

  return (
    <div className="App">
      <Navbar  setIsDark={setIsDark}/>
      <div className="routes">
        <Search  searchValue={searchValue} setSearchValue={setSearchValue}/>
        <Routes>
          <Route path="/:slug" element={<DynecmicTable searchValue={searchValue}/>} />
          <Route path="/:slug/create" element={<Form />} />
          <Route path="/:slug/update/:id" element={<Form/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
