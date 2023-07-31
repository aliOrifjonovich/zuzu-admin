import { Route, Routes } from "react-router-dom";
import "./App.css";
import DynecmicTable from "./components/Table/DynecmicTable";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import BranchForm from "./components/BranchForm/BranchForm";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <Navbar />
      <div className="routes">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <Routes>
          <Route path="/" element={<BranchForm />} />
          <Route
            path="/:slug"
            element={<DynecmicTable searchValue={searchValue} />}
          />
          <Route path="/:slug/create" element={<Form />} />
          <Route path="/:slug/update/:id" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
