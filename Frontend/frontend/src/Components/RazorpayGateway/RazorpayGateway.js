import React, { useEffect, useState } from 'react'
import './RazorpayGateway.css'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';

function RazorpayGateway() {

    const { ticketId } = useParams();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const url = process.env.REACT_APP_ROOT_URL + `/payment/orderId/${ticketId}`
        console.log(url);
        const token = localStorage.getItem('token');

        const sseForOrderId = new EventSource(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            }
        });

        sseForOrderId.onopen = (e) => {
            console.log("sse connected");
        }

        sseForOrderId.addEventListener("order",(e) => {
            let data = JSON.parse(e.data);
            console.log(data);
            sseForOrderId.close();
            setLoader(false);
            initPayment(data);
        })

        sseForOrderId.onerror = (e) => {
            toast.error("Some error occured");
            sseForOrderId.close();
        }

    }, [])

    const initPayment = (data) => {
        console.log(data);
        const options = {
            key: process.env.REACT_APP_RAZORPAY_SECRET_ID,
            name: 'razor1',
            amount: 100*(data["price"]),
            description: "Test Transaction",
            order_id: data["razorpayOrderId"],
            currency: "INR",
            handler: async (response) => {
                const token = localStorage.getItem('token');
                const verifyUrl = process.env.REACT_APP_ROOT_URL + "/payment/verify";
                axios.post(verifyUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "razorpay_payment_id": response.razorpay_payment_id,
                        "razorpay_order_id": response.razorpay_order_id,
                        "razorpay_signature": response.razorpay_signature
                    })
                }).then((res) => {

                }).catch((error) => {

                })
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    
    return (
        <div className='paymentContainer'>
            <ToastContainer />
            {loader
                ?
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                :
                <>RazorpayGateway</>}
        </div>
    )
}

export default RazorpayGateway