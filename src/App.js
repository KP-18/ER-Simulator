import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErDiagram from "./pages/ErDiagram";
import AddEntity from "./pages/AddEntity";
import HomeComp from "./pages/HomeComp";
import AddRelation from "./pages/AddRelation";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComp/>} />
          <Route path="/:id" element={<ErDiagram />} />
          <Route path="/entities/:id" element={<AddEntity />} />
          <Route path="/relations/:id" element={<AddRelation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;