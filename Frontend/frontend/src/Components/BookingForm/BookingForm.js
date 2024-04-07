import React, { useContext, useState } from 'react'
import './BookingForm.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
// import { ToastContainer } from 'react-toastify/dist/components';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookingForm() {

  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(location.state["price"]);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const {placeName} = useParams();
  const navigate = useNavigate();

  const decrease = () => {
    if(quantity > 1){
        setQuantity(quantity-1);
    }else{
        toast.error("Reached Minimum Quantity");
    }
  }

  const increase = () =>{
    setQuantity(quantity+1);
  }

  const createOrder = (e) =>{
    e.preventDefault();
    console.log("order clicked");
    const token = localStorage.getItem('token')
    if(token != null){
        const obj = {};
        obj["email"] = email;
        obj["price"] = price;
        obj["quantity"] = quantity;
        if(location.state["type"] === "place"){
            obj["placeId"] = location.state["id"];
            obj["bookedDates"] = [date];
        }else{
            obj["eventId"] = location.state["id"];
            obj["bookedDates"] = [location.state["date"]]
        }
        obj["placeName"] = placeName

        const url = process.env.REACT_APP_ROOT_URL + "/ticket/buy";
        axios.post(url,obj,{
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }
        ).then((res) => {
            console.log(res);
            if(res.status === 200){
                navigate(`/${res.data.ticketId}/payment`);
            }
        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
            if(error.response.data.status == 500){
                navigate("/sign-in")
            }
        })
    }else{
        navigate("/sign-in")
    }
  }

  return (
    <div className='bookingContainer'>
        <ToastContainer/>
        <form className="beautiful-form">
            <h2>Order Form</h2>
            <div className="form-group">
                <label for="email">Email:</label>
                <input disabled value={email} className="bookingFormInput" type="text" id="quantity" name="quantity" required/>
            </div>
            <div className="form-group">
                <label for="quantity">Quantity:</label>
                <div className='quantityItem'>
                    <div><FontAwesomeIcon style={{height:"25px", width:"25px", marginRight:"10px",cursor:"pointer"}} onClick={() => decrease()} icon={faCircleMinus} /></div>
                    <div>{quantity}</div>
                    <div><FontAwesomeIcon style={{cursor:"pointer", marginLeft:"10px", height:"25px", width:"25px"}} onClick={() => {increase()}} icon={faCirclePlus} /></div>
                </div>
            </div>
            <div className="form-group">
                <label for="price">Price:</label>
                <input disabled value={price*quantity} className="bookingFormInput" type="number" id="price" name="price" step="0.01" required/>
            </div>
            <div className="form-group">
                <label for="date">Date:</label>
                {location.state["type"] == "place" ? <DatePicker minDate={new Date()} className='bookingFormInput' selected={date} onChange={(currentDate) => setDate(currentDate)} /> : <DatePicker className='bookingFormInput' selected={location.state["date"]} disabled/>}
            </div>
            <button className="submitButton" onClick={(e) => {createOrder(e)}}>Submit</button>
        </form>
    </div>
  )
}

export default BookingForm