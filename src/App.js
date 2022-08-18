//css
import './App.css';
//libs
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Maps from "./pages/Maps"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Maps />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
