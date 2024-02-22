import './App.css';
import Explore from './Components/Explore/Explore';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Place from './Components/Place/Place';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Tickets from './Components/Tickets/Tickets';
import PostReview from './Components/PostReview/PostReview';

function App() {
  return (
    <div className='appWrapper'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/explore/:category/:city' element={<Explore/>}/>
          <Route path='/:city/place/:placeName' element={<Place/>}/>
          <Route path='/my-tickets' element={<Tickets/>}/>
          <Route path='/review/:ticketId' element={<PostReview/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
