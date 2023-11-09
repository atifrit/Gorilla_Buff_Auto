import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { getAllDates, getUserBookings } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import './DeleteFormModal.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteFormModal(props) {
    let bookingId = Number(props.bookingId);
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleCancel = async (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        let response = await fetch(`/api/bookings/${bookingId}`, {method:'DELETE'})
        if (response.status > 400) {
            let data = await response.json();
            let errorsStrings = []
            for (let el of data.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            let data = await response.json()
            dispatch(getUserBookings(data))
            dispatch(getAllDates())
            history.push('/bookings/')
            closeModal()
        }
    }


    return (
        <>
            <h1>Are you sure you would like to refund this booking?</h1>
            <div className="deleteFormButtons">
                <button onClick={handleDelete}>Refund Booking</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </>

    )
}
