import React, { useEffect, useState } from 'react'
import './Tickets.css'
import TicketCard from '../TciketCard/TicketCard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == null) {
      navigate('/sign-in');
    } else {
      const url = process.env.REACT_APP_ROOT_URL + "/ticket/all/user";
      axios.get(url, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res);
        setTickets(res.data);
        setLoader(false);
      }).catch((error) => {
        console.log(error);
        toast.error("error while fetching tickets");
      })
    }
  }, [])

  return (
    <div className='ticketContainer'>
      <ToastContainer />
      {loader ?
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />:
        <>{tickets?.map((ticket) => {
            return(
              <TicketCard key={ticket.ticketId} props = {ticket}/>
            )
        })}</>
      }
    </div>
  )
}

export default Tickets