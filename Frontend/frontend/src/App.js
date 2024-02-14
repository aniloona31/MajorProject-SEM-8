import './App.css';
import Explore from './Components/Explore/Explore';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Place from './Components/Place/Place';

function App() {
  return (
    <div className='appWrapper'>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/explore/places/:city' element={<Explore/>}/>
          <Route path='/:city/place/:placeName' element={<Place/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
