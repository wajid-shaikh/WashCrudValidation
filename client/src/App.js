import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListOfActors from "./Components/ListOfActors";
import CreateActor from "./Components/CreateActor";
import ReadActor from "./Components/ReadActor";
import UpdateActor from "./Components/UpdateActor";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<ListOfActors />} />
          <Route path="/create" element={<CreateActor />} />
          <Route path="/read/:id" element={<ReadActor />} />
          <Route path="/update/:id" element={<UpdateActor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
