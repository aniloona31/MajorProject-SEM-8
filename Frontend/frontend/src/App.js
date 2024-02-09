import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='appWrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/Home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
