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
import BookingForm from './Components/BookingForm/BookingForm';
import RazorpayGateway from './Components/RazorpayGateway/RazorpayGateway';

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
          <Route path='/:placeName/:placeId/booking' element={<BookingForm/>}/>
          <Route path='/:ticketId/payment' element={<RazorpayGateway/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
