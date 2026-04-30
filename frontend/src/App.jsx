import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CollegeDetail from "./pages/CollegeDetail";
import Compare from "./pages/Compare";
import QnA from "./pages/QnA";
import Saved from "./pages/Saved";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/college/:id" element={<CollegeDetail />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/qna" element={<QnA />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
}

export default App;