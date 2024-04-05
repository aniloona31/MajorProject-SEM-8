import React, { useEffect, useState } from 'react'
import './PostReview.css'
import { faImages, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

function PostReview({ addReview, ticket }) {

    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_ROOT_URL + '/review/get';
        const token = localStorage.getItem('token');

        if (token != null) {
            axios.get(url, {
                params: { 'ticketId': ticket.ticketId },
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                setDescription(res.data.description);
                setRating(res.data.rating);
                // toast.success("review updated successfully");
            }).catch((error) => {
                toast.error(error.response.data);
            })
        }

    }, [])

    const appendImage = (e) => {
        setImages([...images, e.target.files[0]]);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoader(true);
        console.log(images, rating, description, ticket);
        const token = localStorage.getItem('token');
        if (token != null) {
            const url = process.env.REACT_APP_ROOT_URL + "/review/add-review";
            const formData = new FormData();
            formData.append('description', description);
            formData.append('placeId', ticket.placeId);
            formData.append('ticketId', ticket.ticketId);
            formData.append('email', ticket.email);
            formData.append('rating', rating);

            images.forEach((image) => {
                formData.append('files', image);
            })
            try {
                const resp = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (resp.status === 200) {
                    addReview();
                    toast.success("review added successfully");
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                toast.error('error while adding review');
            }

        } else {
            navigate("/sign-in");
        }
    }

    return (
        <div className='mainWrapper'>
            <ToastContainer />
            {loader ? <div className='placeLoader'><Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div> :
                <div className='mainReviewContainer'>
                    <div className="postReviewContainer">
                        <div className="postReviewTitle">Rate your experience</div>
                        <span onClick={() => { addReview() }}><FontAwesomeIcon style={{ cursor: "pointer", position: "fixed", top: "125px", right: "290px", height: "25px", width: "25px" }} icon={faXmark} /></span>
                        <div className="postReviewContent">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</div>
                        <div className="rate-box">
                            <input onChange={() => setRating(5)} type="radio" name="star" id="star0" checked={rating == 5} />
                            <label className="star" for="star0"></label>
                            <input onChange={() => setRating(4)} type="radio" name="star" id="star1" checked={rating == 4} />
                            <label className="star" for="star1"></label>
                            <input onChange={() => setRating(3)} type="radio" name="star" id="star2" checked={rating == 3} />
                            <label className="star" for="star2"></label>
                            <input onChange={() => setRating(2)} type="radio" name="star" id="star3" checked={rating == 2} />
                            <label className="star" for="star3"></label>
                            <input onChange={() => setRating(1)} type="radio" name="star" id="star4" defaultChecked />
                            <label className="star" for="star4"></label>
                        </div>
                        <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} cols="30" rows="6" placeholder="Tell us about your experience!"></textarea>
                    </div>
                    <div className='lowerPart'>
                        <div className="upload__box">
                            <label className="upload__btn">
                                <span className='uploadFont'><FontAwesomeIcon style={{ height: "50px", width: "40px" }} icon={faImages} /></span>
                                <input onChange={(e) => appendImage(e)} type="file" accept='image/*' multiple data-max_length="20" className="upload__inputfile" />
                                {images?.map((image) => {
                                    return (
                                        <img src={URL.createObjectURL(image)} style={{ marginLeft: "15px", height: "50px", width: "50px", contain: "content" }} />
                                    )
                                })}
                            </label>
                            <div className="upload__img-wrap">

                            </div>
                        </div>
                        <div onClick={(e) => submitForm(e)} className="postReviewSubmitBtn">Send</div>
                    </div>
                </div>}
        </div>
    )
}

export default PostReview