import { Route, Routes } from "react-router-dom";
import "./App.css";
import DynecmicTable from "./components/Table/DynecmicTable";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="routes">
        <Search />
        <Routes>
          <Route path="/:slug" element={<DynecmicTable/>} />
          <Route path="/:slug/create" element={<Form />} />
          <Route path="/:slug/update/:id" element={<Form/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
